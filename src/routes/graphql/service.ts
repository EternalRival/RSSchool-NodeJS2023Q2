import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function getMemberTypes() {
  return prisma.memberType.findMany();
}

export function getPosts() {
  return prisma.post.findMany();
}

export function getUsers() {
  return prisma.user.findMany();
}

export function getProfiles() {
  return prisma.profile.findMany();
}

export function getMemberTypeByMemberTypeId(id: string) {
  return prisma.memberType.findUnique({ where: { id } });
}

export function getPostByPostId(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export function getProfileByUserId(userId: string) {
  return prisma.profile.findUnique({ where: { userId } });
}

export function getUserByUserId(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function getProfileByProfileId(id: string) {
  return prisma.profile.findUnique({ where: { id } });
}

export function getPostsByAuthorId(authorId: string) {
  return prisma.post.findMany({ where: { authorId } });
}
