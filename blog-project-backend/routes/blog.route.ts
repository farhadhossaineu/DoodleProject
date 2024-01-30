import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
  getBlogsWithComments,
} from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blog/:blogId", getBlog);
blogRouter.post("/blog/create", createBlog);
blogRouter.put("/blog/:blogId/edit", editBlog);
blogRouter.delete("/:blogId", deleteBlog);
blogRouter.get("/blogsWithComments", getBlogsWithComments);

export default blogRouter;
