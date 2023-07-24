import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFieldConfig,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { ObjMap } from 'graphql/jsutils/ObjMap.js';
import { Static } from '@sinclair/typebox';
import { changePostByIdSchema, createPostSchema } from '../posts/schemas.js';
import { changeUserByIdSchema, createUserSchema } from '../users/schemas.js';
import { changeProfileByIdSchema, createProfileSchema } from '../profiles/schemas.js';
import {
  subscribeToUserSchema,
  unsubscribeFromUserSchema,
} from '../users/_userId/user-subscribed-to/schemas.js';

type CreatePostDto = Static<(typeof createPostSchema)['body']>;
type CreateUserDto = Static<(typeof createUserSchema)['body']>;
type CreateProfileDto = Static<(typeof createProfileSchema)['body']>;

type UpdatePostDto = Static<(typeof changePostByIdSchema)['body']>;
type UpdateUserDto = Static<(typeof changeUserByIdSchema)['body']>;
type UpdateProfileDto = Static<(typeof changeProfileByIdSchema)['body']>;

type subscribeToUserDtoBody = Static<(typeof subscribeToUserSchema)['body']>;
type subscribeToUserDtoParams = Static<(typeof subscribeToUserSchema)['params']>;
type subscribeToUserDto = subscribeToUserDtoBody & subscribeToUserDtoParams;

type unsubscribeFromUserDto = Static<(typeof unsubscribeFromUserSchema)['params']>;

class GraphQLController {
  MemberTypeIdEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: { value: 'basic' },
      business: { value: 'business' },
    },
  });

  MemberTypeType: GraphQLObjectType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: { type: this.MemberTypeIdEnum },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
      profiles: { type: new GraphQLList(this.ProfileType) },
    }),
  });

  PostType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      id: { type: UUIDType },
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      author: { type: this.UserType },
      authorId: { type: UUIDType },
    }),
  });

  ProfileType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
      id: { type: UUIDType },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      user: { type: this.UserType },
      userId: { type: UUIDType },
      memberType: {
        type: this.MemberTypeType,
        resolve: ({ memberTypeId }, _args, { memberType }: PrismaClient) => {
          return typeof memberTypeId === 'string'
            ? memberType.findUnique({ where: { id: memberTypeId } })
            : null;
        },
      },
      memberTypeId: { type: this.MemberTypeIdEnum },
    }),
  });

  SubscribersOnAuthorsType: GraphQLObjectType = new GraphQLObjectType({
    name: 'SubscribersOnAuthors',
    fields: () => ({
      subscriber: { type: this.UserType },
      subscriberId: { type: UUIDType },
      author: { type: this.UserType },
      authorId: { type: UUIDType },
    }),
  });

  UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: UUIDType },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
      profile: {
        type: this.ProfileType,
        resolve: ({ id }, _args, { profile }: PrismaClient) => {
          return typeof id === 'string'
            ? profile.findUnique({ where: { userId: id } })
            : null;
        },
      },
      posts: {
        type: new GraphQLList(this.PostType),
        resolve: ({ id }, _args, { post }: PrismaClient) => {
          return typeof id === 'string' ? post.findMany({ where: { authorId: id } }) : [];
        },
      },
      // userSubscribedTo: { type: new GraphQLList(this.SubscribersOnAuthorsType) },
      // subscribedToUser: { type: new GraphQLList(this.SubscribersOnAuthorsType) },
      userSubscribedTo: {
        type: new GraphQLList(this.UserType),
        resolve: ({ id }, _args, { user }: PrismaClient) => {
          return typeof id === 'string'
            ? user.findMany({
                where: { subscribedToUser: { some: { subscriberId: id } } },
              })
            : [];
        },
      },
      subscribedToUser: {
        type: new GraphQLList(this.UserType),
        resolve: ({ id }, _args, { user }: PrismaClient) => {
          return typeof id === 'string'
            ? user.findMany({ where: { userSubscribedTo: { some: { authorId: id } } } })
            : [];
        },
      },
    }),
  });

  QueryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: (): ObjMap<GraphQLFieldConfig<unknown, PrismaClient, { id: string }>> => ({
      memberTypes: {
        type: new GraphQLNonNull(new GraphQLList(this.MemberTypeType)),
        resolve: (_, _args, { memberType }) => memberType.findMany(),
      },
      memberType: {
        type: this.MemberTypeType,
        args: { id: { type: new GraphQLNonNull(this.MemberTypeIdEnum) } },
        resolve: (_, { id }, { memberType }) => memberType.findUnique({ where: { id } }),
      },
      posts: {
        type: new GraphQLNonNull(new GraphQLList(this.PostType)),
        resolve: (_, _args, { post }) => post.findMany(),
      },
      post: {
        type: this.PostType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: (_, { id }, { post }) => post.findUnique({ where: { id } }),
      },
      users: {
        type: new GraphQLNonNull(new GraphQLList(this.UserType)),
        resolve: (_, _args, { user }) => user.findMany(),
      },
      user: {
        type: this.UserType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: (_, { id }, { user }) => user.findUnique({ where: { id } }),
      },
      profiles: {
        type: new GraphQLNonNull(new GraphQLList(this.ProfileType)),
        resolve: (_, _args, { profile }) => profile.findMany(),
      },
      profile: {
        type: this.ProfileType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: (_, { id }, { profile }) => profile.findUnique({ where: { id } }),
      },
    }),
  });

  CreatePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
      authorId: { type: UUIDType },
      content: { type: GraphQLString },
      title: { type: GraphQLString },
    }),
  });
  CreateUserInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
    }),
  });
  CreateProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: () => ({
      userId: { type: UUIDType },
      memberTypeId: { type: this.MemberTypeIdEnum },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
    }),
  });
  ChangePostInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
      title: { type: GraphQLString },
    }),
  });
  ChangeProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: () => ({
      isMale: { type: GraphQLBoolean },
    }),
  });
  ChangeUserInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: () => ({
      name: { type: GraphQLString },
    }),
  });

  MutationType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createPost: {
        type: this.PostType,
        args: { dto: { type: new GraphQLNonNull(this.CreatePostInputType) } },
        resolve: (_a, { dto }: { dto: CreatePostDto }, { post }: PrismaClient) => {
          return post.create({ data: dto });
        },
      },
      createUser: {
        type: this.UserType,
        args: { dto: { type: new GraphQLNonNull(this.CreateUserInputType) } },
        resolve: (_a, { dto }: { dto: CreateUserDto }, { user }: PrismaClient) => {
          return user.create({ data: dto });
        },
      },
      createProfile: {
        type: this.ProfileType,
        args: { dto: { type: new GraphQLNonNull(this.CreateProfileInputType) } },
        resolve: (_a, { dto }: { dto: CreateProfileDto }, { profile }: PrismaClient) => {
          return profile.create({ data: dto });
        },
      },
      deletePost: {
        type: GraphQLBoolean,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (_a, { id }: { id: string }, { post }: PrismaClient) => {
          return !!(await post.delete({ where: { id } }));
        },
      },
      deleteProfile: {
        type: GraphQLBoolean,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (_a, { id }: { id: string }, { profile }: PrismaClient) => {
          return !!(await profile.delete({ where: { id } }));
        },
      },
      deleteUser: {
        type: GraphQLBoolean,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (_a, { id }: { id: string }, { user }: PrismaClient) => {
          return !!(await user.delete({ where: { id } }));
        },
      },
      changePost: {
        type: this.PostType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(this.ChangePostInputType) },
        },
        resolve: (
          _a,
          { id, dto }: { id: string; dto: UpdatePostDto },
          { post }: PrismaClient,
        ) => {
          return post.update({ where: { id }, data: dto });
        },
      },
      changeProfile: {
        type: this.ProfileType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(this.ChangeProfileInputType) },
        },
        resolve: (
          _a,
          { id, dto }: { id: string; dto: UpdateProfileDto },
          { profile }: PrismaClient,
        ) => {
          return profile.update({ where: { id }, data: dto });
        },
      },
      changeUser: {
        type: this.UserType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(this.ChangeUserInputType) },
        },
        resolve: (
          _a,
          { id, dto }: { id: string; dto: UpdateUserDto },
          { user }: PrismaClient,
        ) => {
          return user.update({ where: { id }, data: dto });
        },
      },
      subscribeTo: {
        type: this.UserType,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: (
          _a,
          { userId, authorId }: subscribeToUserDto,
          { user }: PrismaClient,
        ) => {
          return user.update({
            where: { id: userId },
            data: { userSubscribedTo: { create: { authorId } } },
          });
        },
      },
      unsubscribeFrom: {
        type: GraphQLBoolean,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (
          _a,
          { userId, authorId }: unsubscribeFromUserDto,
          { subscribersOnAuthors }: PrismaClient,
        ) => {
          return !!(await subscribersOnAuthors.delete({
            where: {
              subscriberId_authorId: { subscriberId: userId, authorId: authorId },
            },
          }));
        },
      },
    }),
  });
}

const controller = new GraphQLController();

export const graphQLSchema: GraphQLSchema = new GraphQLSchema({
  query: controller.QueryType,
  mutation: controller.MutationType,
  types: [
    controller.MemberTypeIdEnum,
    controller.MemberTypeType,
    controller.PostType,
    controller.ProfileType,
    controller.SubscribersOnAuthorsType,
    controller.UserType,
    controller.CreatePostInputType,
    controller.CreateUserInputType,
    controller.CreateProfileInputType,
    controller.ChangePostInputType,
    controller.ChangeProfileInputType,
    controller.ChangeUserInputType,
  ],
});
