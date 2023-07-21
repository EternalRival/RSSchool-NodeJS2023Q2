import { PrismaClient } from '@prisma/client';

export class GraphQLService {
  constructor(private prisma: PrismaClient) {}

  getMemberTypes() {
    return this.prisma.memberType.findMany();
  }

  getPosts() {
    return this.prisma.post.findMany();
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  getProfiles() {
    return this.prisma.profile.findMany();
  }

  getMemberTypeByMemberTypeId(id: string) {
    return this.prisma.memberType.findUnique({ where: { id } });
  }

  getPostByPostId(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  getProfileByUserId(userId: string) {
    return this.prisma.profile.findUnique({ where: { userId } });
  }

  getUserByUserId(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  getProfileByProfileId(id: string) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  getPostsByAuthorId(authorId: string) {
    return this.prisma.post.findMany({ where: { authorId } });
  }
}
