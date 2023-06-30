import http from 'http';
import { validate } from 'uuid';
import { AppProperties } from './interfaces/app-properties.interface';
import { inject } from '../helpers/inject';
import { RequestMethod } from './enums/request-method.enum';
import { StatusCode } from './enums/status-code.enum';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { isValidUser } from './users/user.validator';
import { ResponseMessage } from './enums/response-message.enum';

export class AppController {
  private defaultPort = 3000;

  port?: number;

  appService = new AppService();

  constructor(props: AppProperties) {
    inject(this, props);
  }

  createServer() {
    const server = http.createServer((req, res) => {
      const send = <T>(statusCode: StatusCode, data?: T) => {
        res.writeHead(statusCode);
        if (data) res.end(JSON.stringify(data));
        else res.end();
      };

      const getBody = (): Promise<unknown> =>
        new Promise((resolve, reject) => {
          const body: Buffer[] = [];
          req.on('data', (chunk: Buffer) => body.push(chunk));
          req.on('error', reject);
          req.on('end', () => {
            resolve(JSON.parse(Buffer.concat(body).toString()));
          });
        });

      const { method, url } = req;
      const endpoint = '/api/users';

      try {
        if (url === endpoint) {
          if (method === RequestMethod.GET) {
            const result = this.appService.findAll();
            send(StatusCode.OK, result);
          }
          if (method === RequestMethod.POST) {
            getBody()
              .then((body) => {
                if (isValidUser(body)) {
                  const { id, username, age, hobbies } = body as User;
                  const newUser = new User(id, username, age, hobbies);
                  const createdUser = this.appService.create(newUser);
                  send(StatusCode.CREATED, createdUser);
                } else
                  send(
                    StatusCode.BAD_REQUEST,
                    ResponseMessage.INVALID_USER_DATA,
                  );
              })
              .catch((error) => {
                console.error(error);
                send(
                  StatusCode.INTERNAL_SERVER_ERROR,
                  ResponseMessage.INTERNAL_SERVER_ERROR,
                );
              });
          }
        } else if (url?.startsWith(`${endpoint}/`)) {
          const [userId] = url.slice(endpoint.length + 1).split('/');
          const user = this.appService.findOneById(userId);
          if (!validate(userId))
            send(StatusCode.BAD_REQUEST, ResponseMessage.INVALID_UUID);
          else if (!user)
            send(StatusCode.NOT_FOUND, ResponseMessage.USER_DOESNT_EXIST);
          else if (method === RequestMethod.GET) send(StatusCode.OK, user);
          else if (method === RequestMethod.PUT) {
            getBody()
              .then((body) => {
                if (isValidUser(body)) {
                  const { id, username, age, hobbies } = body as User;
                  const newUser = new User(id, username, age, hobbies);
                  const updatedUser = this.appService.update(newUser);
                  send(StatusCode.OK, updatedUser);
                } else
                  send(
                    StatusCode.BAD_REQUEST,
                    ResponseMessage.INVALID_USER_DATA,
                  );
              })
              .catch((error) => {
                console.error(error);
                send(
                  StatusCode.INTERNAL_SERVER_ERROR,
                  ResponseMessage.INTERNAL_SERVER_ERROR,
                );
              });
          } else if (method === RequestMethod.DELETE) {
            this.appService.remove(userId);
            send(StatusCode.NO_CONTENT);
          }
        } else {
          send(StatusCode.NOT_FOUND, ResponseMessage.WRONG_URL);
        }
      } catch (error) {
        console.error(error);
        send(
          StatusCode.INTERNAL_SERVER_ERROR,
          ResponseMessage.INTERNAL_SERVER_ERROR,
        );
      }
    });
    server.listen(this.port ?? this.defaultPort, () => {
      console.log('Server started!');
    });
  }
}
