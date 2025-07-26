import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInputSchema,
  updateBlogInputSchema,
  paginationQuerySchema,
  blogIdParamSchema,
} from "@hashtagronitt/metawrite-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    authorId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      c.status(401);
      return c.json({ error: "Unauthorized: Missing token" });
    }

    const token = jwt.split(" ")[1];
    const payload = (await verify(token, c.env.JWT_SECRET)) as { id: string };

    if (!payload || !payload.id) {
      c.status(401);
      return c.json({ error: "Unauthorized: Invalid token" });
    }

    c.set("userId", payload.id);

    await next();
  } catch (e) {
    console.error("Auth Middleware Error:", e);
    c.status(403);
    return c.json({ error: "Unauthorized: Token verification failed" });
  }
});

blogRouter.post("/", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsed = createBlogInputSchema.safeParse(body);
    if (!parsed.success) {
      c.status(400);
      return c.json({
        error: "Validation failed",
        details: parsed.error.format(),
      });
    }

    const blog = await prisma.blog.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        authorId: userId,
      },
    });

    return c.json({
      message: "Blog created successfully",
      id: blog.id,
    });
  } catch (e) {
    console.error("Blog creation error:", e);
    c.status(500);
    return c.json({ error: "Something went wrong while creating the blog" });
  }
});

blogRouter.put("/", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsed = updateBlogInputSchema.safeParse(body);
    if (!parsed.success) {
      c.status(400);
      return c.json({
        error: "Validation failed",
        details: parsed.error.format(),
      });
    }

    const { id, title, content } = parsed.data;

    const post = await prisma.blog.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== userId) {
      c.status(403);
      return c.json({ error: "Unauthorized or post not found" });
    }

    await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return c.text("Blog updated successfully");
  } catch (e) {
    console.error("Blog update error:", e);
    c.status(500);
    return c.json({ error: "Failed to update blog" });
  }
});

//to fetch from frontend
///bulk?page=1&limit=10
///bulk?page=2&limit=10

blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const parsed = paginationQuerySchema.safeParse({
      page: c.req.query("page"),
      limit: c.req.query("limit"),
    });

    if (!parsed.success) {
      c.status(400);
      return c.json({
        error: "Invalid pagination query",
        details: parsed.error.format(),
      });
    }

    const { page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    const blogs = await prisma.blog.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalBlogs = await prisma.blog.count();

    return c.json({
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    });
  } catch (e) {
    console.error("Fetch blogs error:", e);
    c.status(500);
    return c.json({ error: "Failed to fetch blogs" });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const rawId = c.req.param("id");

    const parsed = blogIdParamSchema.safeParse({ id: rawId });

    if (!parsed.success) {
      c.status(400);
      return c.json({
        error: "Invalid blog ID",
        details: parsed.error.format(),
      });
    }

    const { id } = parsed.data;

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }

    return c.json(post);
  } catch (e) {
    console.error("Fetch blog error:", e);
    c.status(500);
    return c.json({ error: "Failed to fetch blog" });
  }
});

blogRouter.delete("/:id", async (c) => {
  try {
    const userId = c.get("userId");

    const parsed = blogIdParamSchema.safeParse({ id: c.req.param("id") });
    if (!parsed.success) {
      c.status(400);
      return c.json({ error: parsed.error.format() });
    }

    const { id } = parsed.data;

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }

    if (blog.authorId !== userId) {
      c.status(403);
      return c.json({ error: "You are not authorized to delete this Blog" });
    }

    await prisma.blog.delete({ where: { id } });

    return c.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});
