import { PrismaClient } from '@prisma/client';

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
