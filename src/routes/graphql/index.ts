import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { graphqlSchema } from './graphql-schema.js';
import {
  getMemberTypeByMemberTypeId,
  getMemberTypes,
  getPostByPostId,
  getPosts,
  getPostsByAuthorId,
  getProfileByProfileId,
  getProfileByUserId,
  getProfiles,
  getUserByUserId,
  getUsers,
} from './service.js';

const controller: Record<string, (arg: { id: string }) => unknown> = {
  memberTypes: () => getMemberTypes(),
  posts: () => getPosts(),
  users: () => getUsers(),
  profiles: () => getProfiles(),

  memberType: ({ id }) => getMemberTypeByMemberTypeId(id),
  post: ({ id }) => getPostByPostId(id),
  user: async ({ id }) => {
    return await getUserByUserId(id);
    /* const result = {
      id: null,
      name: null,
      balance: null,
      profile: null,
      posts: null,
      userSubscribedTo: null,
      subscribedToUser: null,
    };
    const user = await getUserByUserId(id);
    if (user) {
      const posts = await getPostsByAuthorId(id);
      Object.assign(result, { posts });

      const profile = await getProfileByUserId(user.id);
      Object.assign(result, user, { profile });

      if (profile) {
        const memberType = await getMemberTypeByMemberTypeId(profile.memberTypeId);
        Object.assign(profile, { memberType });
      }

      return result;
    }
    return null; */
  },
  profile: ({ id }) => getProfileByProfileId(id),
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

      const gql = await graphql({
        schema: graphqlSchema,
        source,
        variableValues,
        rootValue: controller,
      });

      return gql;
    },
  });
};

export default plugin;
