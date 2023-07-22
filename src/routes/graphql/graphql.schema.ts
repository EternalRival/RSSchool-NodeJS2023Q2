import { buildSchema } from 'graphql';

export const GraphQLSchema = buildSchema(`
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
  memberTypes: [MemberType]!
  memberType(id: MemberTypeId!): MemberType
  posts: [Post]!
  post(id: UUID!): Post
  users: [User]!
  user(id: UUID!): User
  profiles: [Profile]!
  profile(id: UUID!): Profile
}
`);
