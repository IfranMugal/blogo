import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { decode, sign, verify } from 'hono/jwt'
import {createblogZod, updateblogZod} from 'blogo-common'


// this is how we specify types to our env variables in typescript in hono
// because datasourceUrl expects string 
export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string,
        authorId : string
	},
    Variables : {
        authorId : string;
    }
}>();

// Apply to all methods and paths
blogRouter.use(async(c, next) => {
    const header = c.req.header("authorization") || " ";
    const token = header.split(" ")[1];
    try {
        const user = await verify(token, c.env.JWT_SECRET);

        if (!user || typeof user.id !== 'string') {
            c.status(403);
            return c.json({ message: "unauthorized" });
        }

        c.set("authorId", user.id);
        console.log("Authenticated user ID:", user.id);

        await next();
    } catch (error) {
        c.status(403);
        return c.json({ error: "Invalid token" });
    }
});


blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = createblogZod.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error : "validation failed"
        })
    }
    const authorId = c.get("authorId")
    try {
        const blog = await prisma.post.create({
            data: {
                title : body.title,
                content : body.content,
                authorId : authorId
            }
        })
        return c.json({
            message : "created blog with id ",
            id : blog.id
        })
    } catch (error) {
        c.status(411);
        return c.json({error : error}) 
    }
    
})
  
blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        const body = await c.req.json();

        const {success} = updateblogZod.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                error : "validation failed"
            })
        }
        try {
            const authorId = c.get("authorId");
            const userCheck = await prisma.post.findFirst({
                where : {
                    id : body.id
                }
            })

            if(userCheck && userCheck.authorId !== authorId){
                return c.json({
                    message : "you cannot update others blog"
                })
            }
            const blog = await prisma.post.update({
                where :{
                    id : body.id
                },
                data: {
                    title : body.title,
                    content : body.content
                }
            })
            return c.json({
                message : "updated blog with id ",
                id : blog.id
            })
        } catch (error) {
            c.status(411);
            return c.json({error : error}) 
        }
})


// Todo : add pagination
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany({
            select :{
                title : true,
                content : true,
                id : true,
                author :{
                    select :{
                        name : true,
                    }
                },
                authorId : true
            }
        });

        return c.json({
            blogs : blogs
        })
    } catch (error) {
        c.status(411);
        return c.json({
            error : error
        })
    }

})


// to get all blog of current user
blogRouter.get('/userbulk', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const authorId = c.get("authorId");
        console.log("author id from userblog : ",authorId)
        const blogs = await prisma.post.findMany({
            where :{
                authorId : authorId
            },
            select :{
                title : true,
                content : true,
                id : true,
                author :{
                    select :{
                        name : true,
                    }
                },
                authorId : true
            }
        });

        return c.json({
            blogs : blogs,
            authorid : authorId
        })
    } catch (error) {
        c.status(411);
        return c.json({
            error : error
        })
    }
})
  
blogRouter.get('/:id', async(c) => {
    
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const id = c.req.param('id');
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id : id
            },
            select :{
                title : true,
                content : true,
                id : true,
                author :{
                    select :{
                        name : true,
                    }
                },
                authorId : true
            }
        })
        if(!blog){
            return c.json({
                message : "No blog found with this id"
            })
        }
        return c.json({
            message : "blog found",
            blog : blog
        })
    }catch (error) {
        c.status(411);
        return c.json({error : error}) 
    }
})
  

// {
//     "id" : "01890d93-66a6-4e33-b7bb-b3e14e97717a",
//     "title" : "Library",
//     "content" : "created my own library"
// }