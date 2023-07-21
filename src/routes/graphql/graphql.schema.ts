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
