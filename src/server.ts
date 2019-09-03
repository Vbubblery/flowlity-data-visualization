import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

import { ApolloServer } from "apollo-server-koa";

import schema from "./graphql/schema";
import { init } from "./config";

const apolloRoute = "/graphql";
const port: number = 4000;

const bootstrap = async () => {
  await init("staging_db");

  const context = async (args: any) => {
    // if (args.ctx&&args.ctx.header&&args.ctx.headers.user) {
    //   const user:any = JSON.parse(args.ctx.header.user);
    //   return {user};
    // }
  };

  const server = new ApolloServer({ schema, context });
  const app = new Koa();
  app.use(cors());
  app.use(bodyParser());

  server.applyMiddleware({ app, path: apolloRoute });
  app.listen({ port }, () =>
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
};

bootstrap();
