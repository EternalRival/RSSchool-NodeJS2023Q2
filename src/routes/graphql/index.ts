import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { buildSchema, graphql } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';

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
      }

      type Post {
        id: UUID
        title: String
        content: String
        authorId: UUID
      }

      type User {
        id: UUID
        name: String
        balance: Float
      }

      type Profile {
        id: UUID
        isMale: Boolean
        yearOfBirth: Int
        memberTypeId: MemberTypeId
        userId: UUID
      }

      type Query {
        memberTypes: [MemberType]
        memberType(id: MemberTypeId): MemberType
        posts: [Post]
        post(id: UUID): Post
        users: [User]
        user(id: UUID): User
        profiles: [Profile]
        profile(id: UUID): Profile
      }

    `);

const prisma = new PrismaClient();

const rootValue = {
  memberTypes: () => prisma.memberType.findMany(),
  memberType: ({ id }: { id: string }) => prisma.memberType.findUnique({ where: { id } }),
  posts: () => prisma.post.findMany(),
  post: ({ id }: { id: string }) => prisma.post.findUnique({ where: { id } }),
  users: () => prisma.user.findMany(),
  user: ({ id }: { id: string }) => prisma.user.findUnique({ where: { id } }),
  profiles: () => prisma.profile.findMany(),
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
      console.log(query, variableValues);

      const gql = await graphql({ schema, source, variableValues, rootValue });

      return gql;
    },
  });
};

export default plugin;
