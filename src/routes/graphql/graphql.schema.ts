import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFieldConfig,
  GraphQLFloat,
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

/* 
export class GraphQLService {
  constructor(private prisma: PrismaClient) {}

  //* memberType
  getMemberTypes() {
    return this.prisma.memberType.findMany();
  }
  getMemberTypeByMemberTypeId(id: string) {
    return this.prisma.memberType.findUnique({ where: { id } });
  }

  //* post
  getPosts() {
    return this.prisma.post.findMany();
  }
  getPostByPostId(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  //* profile
  getProfiles() {
    return this.prisma.profile.findMany();
  }
  getProfileByProfileId(id: string) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  //* user
  getUsers() {
    return this.prisma.user.findMany();
  }
  getUserByUserId(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  //* user extended
  getPostsByAuthorId(authorId: string) {
    return this.prisma.post.findMany({ where: { authorId } });
  }
  getProfileByUserId(userId: string) {
    return this.prisma.profile.findUnique({ where: { userId } });
  }
  getSubscribedToUserByAuthorId(authorId: string) {
    return this.prisma.user.findMany({
      where: { userSubscribedTo: { some: { authorId } } },
    });
  }
  getUserSubscribedToBySubscriberId(subscriberId: string) {
    return this.prisma.user.findMany({
      where: { subscribedToUser: { some: { subscriberId } } },
    });
  }
}
 */

class GraphQLController {
  MemberTypeIdEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: { value: 'basic' },
      business: { value: 'business' },
    },
  });

  MemberTypeType = new GraphQLObjectType({
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
        resolve: ({ memberTypeId }, _a, { memberType }: PrismaClient) => {
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
        resolve: ({ id }, _a, { profile }: PrismaClient) => {
          return typeof id === 'string'
            ? profile.findUnique({ where: { userId: id } })
            : null;
        },
      },
      posts: {
        type: new GraphQLList(this.PostType),
        resolve: ({ id }, _a, { post }: PrismaClient) => {
          return typeof id === 'string' ? post.findMany({ where: { authorId: id } }) : [];
        },
      },
      userSubscribedTo: { type: new GraphQLList(this.SubscribersOnAuthorsType) },
      subscribedToUser: { type: new GraphQLList(this.SubscribersOnAuthorsType) },
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
}

const controller = new GraphQLController();

export const graphQLSchema: GraphQLSchema = new GraphQLSchema({
  query: controller.QueryType,
  types: [
    controller.MemberTypeIdEnum,
    controller.MemberTypeType,
    controller.PostType,
    controller.ProfileType,
    controller.SubscribersOnAuthorsType,
    controller.UserType,
  ],
});
