import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { buildSchema, graphql } from 'graphql';
import { PrismaClient } from '@prisma/client';

const schema = buildSchema(`
      enum MemberTypeId {
        basic,
        business
      }

      scalar UUID

      type MemberType {
        id: MemberTypeId
        discount: Float
        postsLimitPerMonth: Int
        profiles: [Profile]
      }

      type Post {
        id: UUID
        title: String
        content: String
        author: User
        authorId: UUID
      }

      type Profile {
        id: UUID
        isMale: Boolean
        yearOfBirth: Int
        user: User
        userId: UUID
        memberType: MemberType
        memberTypeId: MemberTypeId
      }

      type SubscribersOnAuthors {
        subscriber: User
        subscriberId: UUID
        author: User
        authorId: UUID
      }

      type User {
        id: UUID
        name: String
        balance: Float
        profile: Profile
        posts: [Post]
        userSubscribedTo: [SubscribersOnAuthors]
        subscribedToUser: [SubscribersOnAuthors]
      }

      type Query {
        memberTypes: [MemberType]
        posts: [Post]
        users: [User]
        profiles: [Profile]
        memberType(id: MemberTypeId): MemberType
        post(id: UUID): Post
        user(id: UUID): User
        profile(id: UUID): Profile
      }

    `);

const prisma = new PrismaClient();

const rootValue = {
  memberTypes: () => prisma.memberType.findMany(),
  posts: () => prisma.post.findMany(),
  users: () => prisma.user.findMany(),
  profiles: () => prisma.profile.findMany(),

  memberType: ({ id }: { id: string }) => prisma.memberType.findUnique({ where: { id } }),
  post: ({ id }: { id: string }) => prisma.post.findUnique({ where: { id } }),
  user: ({ id }: { id: string }) => prisma.user.findUnique({ where: { id } }),
  profile: ({ id }: { id: string }) => prisma.profile.findUnique({ where: { id } }),
};

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const source = query;
      const variableValues = variables;
      console.log(query, JSON.stringify(variableValues));

      const gql = await graphql({ schema, source, variableValues, rootValue });

      return gql;
    },
  });
};

export default plugin;
