import http from 'http';
import { validate } from 'uuid';
import { AppProperties } from './interfaces/app-properties.interface';
import { inject } from '../helpers/inject';
import { RequestMethod } from './enums/request-method.enum';
import { StatusCode } from './enums/status-code.enum';
import { AppService } from './app.service';
import { User } from './entities/user.entity';

export class AppController {
  port = 3000;

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

      try {
        const { method, url } = req;
        const usersPath = '/api/users';

        if (url === usersPath) {
          if (method === RequestMethod.GET) {
            const result = this.appService.findAll();
            send(StatusCode.OK, result);
          }
          if (method === RequestMethod.POST) {
            getBody()
              .then((body) => {
                if (User.isUser(body)) {
                  const { id, username, age, hobbies } = body as User;
                  const newUser = new User(id, username, age, hobbies);
                  const createdUser = this.appService.create(newUser);
                  send(StatusCode.CREATED, createdUser);
                } else
                  send(
                    StatusCode.BAD_REQUEST,
                    'request body does not contain required fields with proper types',
                  );
              })
              .catch((error) => {
                console.error(error);
                send(StatusCode.INTERNAL_SERVER_ERROR, 'internal server error');
              });
          }
        } else if (url?.startsWith(`${usersPath}/`)) {
          const [userId] = url.slice(usersPath.length + 1).split('/');
          const user = this.appService.findOneById(userId);
          if (!validate(userId)) send(StatusCode.BAD_REQUEST, 'invalid id');
          else if (!user) send(StatusCode.NOT_FOUND, "user doesn't exist");
          else if (method === RequestMethod.GET) send(StatusCode.OK, user);
          else if (method === RequestMethod.PUT) {
            getBody()
              .then((body) => {
                if (User.isUser(body)) {
                  const { id, username, age, hobbies } = body as User;
                  const newUser = new User(id, username, age, hobbies);
                  const updatedUser = this.appService.update(newUser);
                  send(StatusCode.OK, updatedUser);
                } else
                  send(
                    StatusCode.BAD_REQUEST,
                    'request body does not contain required fields with proper types',
                  );
              })
              .catch((error) => {
                console.error(error);
                send(StatusCode.INTERNAL_SERVER_ERROR, 'internal server error');
              });
          } else if (method === RequestMethod.DELETE) {
            this.appService.remove(userId);
            send(StatusCode.NO_CONTENT);
          }
        } else {
          send(StatusCode.NOT_FOUND, 'wrong url');
        }
      } catch (error) {
        console.error(error);
        send(StatusCode.INTERNAL_SERVER_ERROR, 'internal server error');
      }
    });
    server.listen(this.port);
  }
}
