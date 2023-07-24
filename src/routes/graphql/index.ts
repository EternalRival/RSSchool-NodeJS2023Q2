import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { graphQLSchema } from './graphql.schema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

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

      console.debug(query, JSON.stringify(variableValues));

      return graphql({
        schema: graphQLSchema,
        source,
        variableValues,
        contextValue: prisma,
      });
    },
  });
};

export default plugin;
