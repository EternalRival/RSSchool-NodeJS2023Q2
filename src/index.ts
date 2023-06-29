import 'dotenv/config';
import { App } from './app/app.module';

const port = Number(process.env.SERVER_PORT) || null;

const app = new App({ port });

app.run();
