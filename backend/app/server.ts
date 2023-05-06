import express, { Application } from 'express';
import cors from "cors";
import compression from "compression";
import { User } from "./schema";

import { Database } from "./db";
import { Routes } from "./router";

class Server {
  public app: Application

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.database();
  }

  public config(): void {
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: '*',
      credentials: true,
      optionsSuccessStatus: 200
    }));
  }

  public routes(): void {
    this.app.use('/', new Routes().router);
  }

  public database(): void {
    Database.connectDatabase(process.env.DATABASE_URI_LOCAL);
  }

  public start(): void {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on ${'Test'}:${3000}`);
    });
  }
}
const server = new Server();
server.start();
