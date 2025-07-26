import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import {
  signupInputSchema,
  signinInputSchema,
} from "@hashtagronitt/metawrite-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  console.log("Signup route hit");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const parsed = signupInputSchema.safeParse(body);
    if (!parsed.success) {
      console.log("Zod validation error (formatted):", parsed.error.format());
      return c.json({ error: parsed.error.format() }, 400);
    }

    let { email, name, password } = parsed.data;

    email = email.toLowerCase().trim();

    console.log("Validated signup body:", { email, name, password });

    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingUser) {
      return c.json({ error: "User already exists" }, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return c.json(
      {
        message: "Signup successful",
        user: { id: user.id, email: user.email, name: user.name },
      },
      201
    );
  } catch (err) {
    console.error("Signup route error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const parsed = signinInputSchema.safeParse(body);
    if (!parsed.success) {
      console.log("Zod validation error (formatted):", parsed.error.format());
      return c.json({ error: parsed.error.format() }, 400);
    }

    let { email, password } = parsed.data;

    email = email.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      c.status(403);
      return c.json({ error: "Invalid email or password" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.error("Signin error:", e);
    c.status(500);
    return c.json({ error: "Something went wrong during signin" });
  }
});
