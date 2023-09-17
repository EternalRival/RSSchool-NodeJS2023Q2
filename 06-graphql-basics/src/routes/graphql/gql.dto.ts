import { Static } from '@sinclair/typebox';
import { changePostByIdSchema, createPostSchema } from '../posts/schemas.js';
import { changeUserByIdSchema, createUserSchema } from '../users/schemas.js';
import { changeProfileByIdSchema, createProfileSchema } from '../profiles/schemas.js';
import {
  subscribeToUserSchema,
  unsubscribeFromUserSchema,
} from '../users/_userId/user-subscribed-to/schemas.js';

export type CreatePostDto = Static<(typeof createPostSchema)['body']>;
export type CreateUserDto = Static<(typeof createUserSchema)['body']>;
export type CreateProfileDto = Static<(typeof createProfileSchema)['body']>;
export type UpdatePostDto = Static<(typeof changePostByIdSchema)['body']>;
export type UpdateUserDto = Static<(typeof changeUserByIdSchema)['body']>;
export type UpdateProfileDto = Static<(typeof changeProfileByIdSchema)['body']>;
type subscribeToUserDtoBody = Static<(typeof subscribeToUserSchema)['body']>;
type subscribeToUserDtoParams = Static<(typeof subscribeToUserSchema)['params']>;
export type subscribeToUserDto = subscribeToUserDtoBody & subscribeToUserDtoParams;
export type unsubscribeFromUserDto = Static<(typeof unsubscribeFromUserSchema)['params']>;
