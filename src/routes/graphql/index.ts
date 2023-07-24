import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { graphQLSchema } from './graphql.schema.js';
import depthLimit from 'graphql-depth-limit';

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
      const maxDepth = 5;

      // console.debug(query, JSON.stringify(variables));

      const documentAST = parse(query);
      const validateErrors = validate(graphQLSchema, documentAST, [depthLimit(maxDepth)]);

      return validateErrors.length
        ? { errors: validateErrors }
        : graphql({
            schema: graphQLSchema,
            source: query,
            variableValues: variables,
            contextValue: prisma,
          });
    },
  });
};

export default plugin;
