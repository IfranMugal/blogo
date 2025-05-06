import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { userRouter } from './Routes/user';
import { blogRouter } from './Routes/blog';

// this is how we specify types to our env variables in typescript in hono
// because datasourceUrl expects string 
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();


app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


export default app
