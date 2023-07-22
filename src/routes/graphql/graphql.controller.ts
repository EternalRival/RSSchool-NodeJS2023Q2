import { GraphQLService } from './graphql.service.js';

export class GraphQLController {
  constructor(private service: GraphQLService) {}

  memberTypes() {
    return this.service.getMemberTypes();
  }
  posts() {
    return this.service.getPosts();
  }
  users() {
    return this.service.getUsers();
  }
  profiles() {
    return this.service.getProfiles();
  }

  memberType({ id }: { id: string }) {
    return this.service.getMemberTypeByMemberTypeId(id);
  }
  post({ id }: { id: string }) {
    return this.service.getPostByPostId(id);
  }
  user({ id }: { id: string }) {
    return this.service.getUserByUserId(id);
  }
  profile({ id }: { id: string }) {
    return this.service.getProfileByProfileId(id);
  }

  subscribedToUser({ id }: { id: string }) {
    return this.service.getSubscribedToUserByAuthorId(id);
  }
  userSubscribedTo({ id }: { id: string }) {
    return this.service.getUserSubscribedToBySubscriberId(id);
  }
}
