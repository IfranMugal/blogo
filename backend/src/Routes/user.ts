import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

import { signupZod } from 'blogo-common';
import { signinZod } from 'blogo-common';


// this is how we specify types to our env variables in typescript in hono
// because datasourceUrl expects string 
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signupZod.safeParse(body)

    if(!success){
      c.status(411);
      return c.json({
        error : "please enter valid details"
      })
    }
  
    try {
      if(body.password.length < 5){
        c.status(411);
        return c.json({
          message : "password error"
        })
      }
      const user = await prisma.user.create({
        data :{
          email : body.email,
          name : body.name,
          password : body.password
        }
      })
      
      const token = await sign({id : user.id},c.env.JWT_SECRET)
    
      return c.json({
        message : 'signup successfull',
        token : token
      })
    } catch (error) {
      c.status(403)
      return c.json({error})
    }
  })
  
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const user = await c.req.json();

    const {success} = signinZod.safeParse(user);
    if(!success){
      c.status(411);
      return c.json({
        error : "please enter valid details"
      })
    }

    try {
        const isthere = await prisma.user.findUnique({
            where :{
            email : user.email
            }
        })
    
        console.log(isthere)
    
        if(!isthere){
            return c.json({
                message : "Invalid email"
            })
        }
        if(isthere.password !== user.password){
            return c.json({
                message : "incorrect password"
            })
        }
    
        const token = await sign({id : isthere.id},c.env.JWT_SECRET)
        return c.json({
            message : "user signin successfull",
            token
        })
    }catch (error) {
        c.status(403)
        return c.json({error})
    }
})