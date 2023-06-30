import { createServer, Server, RequestListener, IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { AppProperties } from './interfaces/app-properties.interface';
import { inject } from '../helpers/inject';
import { RequestMethod } from './enums/request-method.enum';
import { StatusCode } from './enums/status-code.enum';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { isValidUser } from './users/user.validator';
import { ResponseMessage } from './enums/response-message.enum';
import { getRequestBody } from '../helpers/get-request-body';
import { UserNotFoundError } from './errors/user-not-found.error';
import { InvalidUuidError } from './errors/invalid-uuid.error';
import { InvalidEndpointError } from './errors/invalid-endpoint.error';
import { InvalidUserDataError } from './errors/invalid-user-data.error';
import { parseId } from '../helpers/parse-id';

export class AppController {
  private defaultPort: number = 3000;

  private port?: number;

  private appService = new AppService();

  constructor(props: AppProperties) {
    inject(this, props);
  }

  public createServer(): void {
    const requestListener: RequestListener = (request, response) => {
      const { method, url } = request;
      const endpoint = '/api/users';

      try {
        if (url === endpoint) {
          if (method === RequestMethod.GET) {
            this.handleGetUserList(response);
          } else if (method === RequestMethod.POST) {
            this.handleCreateUser(response, request).catch((error) => {
              throw error;
            });
          } else {
            throw new InvalidEndpointError();
          }
        } else if (url?.startsWith(`${endpoint}/`)) {
          const uuid: string = parseId(url, endpoint);
          if (!validate(uuid)) {
            throw new InvalidUuidError();
          }

          const user: User | null = this.appService.findOneById(uuid);
          if (!user) {
            throw new UserNotFoundError();
          }

          if (method === RequestMethod.GET) {
            this.handleGetUser(response, user);
          } else if (method === RequestMethod.PUT) {
            this.handleUpdateUser(response, request, uuid).catch((error) => {
              throw error;
            });
          } else if (method === RequestMethod.DELETE) {
            this.handleDeleteUser(response, uuid);
          } else {
            throw new InvalidEndpointError();
          }
        } else {
          throw new InvalidEndpointError();
        }
      } catch (error) {
        this.handleRequestErrors(error, response);
      }
    };

    const port: number = this.port ?? this.defaultPort;
    const server: Server = createServer(requestListener);
    server.listen(port, () => console.log('Server started!'));
  }

  private send(response: ServerResponse, statusCode: StatusCode, data?: unknown): this {
    response.writeHead(statusCode);
    if (data) {
      response.end(JSON.stringify(data));
    } else {
      response.end();
    }

    return this;
  }

  private handleRequestErrors(error: unknown, response: ServerResponse): void {
    console.error(error);
    if (error instanceof InvalidUuidError) {
      this.send(response, StatusCode.BAD_REQUEST, error.message);
    } else if (error instanceof InvalidUserDataError) {
      this.send(response, StatusCode.BAD_REQUEST, error.message);
    } else if (error instanceof UserNotFoundError) {
      this.send(response, StatusCode.NOT_FOUND, error.message);
    } else if (error instanceof InvalidEndpointError) {
      this.send(response, StatusCode.NOT_FOUND, error.message);
    } else {
      this.send(response, StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR);
    }
  }

  private handleGetUserList(response: ServerResponse): void {
    this.send(response, StatusCode.OK, this.appService.findAll());
  }

  private handleGetUser(response: ServerResponse, user: User): void {
    this.send(response, StatusCode.OK, user);
  }

  private async handleCreateUser(response: ServerResponse, request: IncomingMessage): Promise<void> {
    const body: unknown = await getRequestBody(request);
    if (isValidUser(body)) {
      const { username, age, hobbies } = body as User;
      const userData = { username, age, hobbies };
      const user: User = this.appService.createUser(userData);
      this.send(response, StatusCode.CREATED, user);
    } else {
      throw new InvalidUserDataError();
    }
  }

  private async handleUpdateUser(response: ServerResponse, request: IncomingMessage, id: string): Promise<void> {
    const body: unknown = await getRequestBody(request);
    if (isValidUser(body)) {
      const { username, age, hobbies } = body as User;
      const userData = { id, username, age, hobbies };
      const user = this.appService.updateUser(userData);
      this.send(response, StatusCode.OK, user);
    } else {
      throw new InvalidUserDataError();
    }
  }

  private handleDeleteUser(response: ServerResponse, id: string): void {
    this.appService.remove(id);
    this.send(response, StatusCode.NO_CONTENT);
  }
}
