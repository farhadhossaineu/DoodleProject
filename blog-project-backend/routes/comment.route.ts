import express from "express";
import {
  createCommentForBlog,
  deleteCommentForBlog,
  editCommentForBlog,
  getAllCommentsForBlog,
} from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/comment/:blogId/create", createCommentForBlog);
commentRouter.put("/blog/:blogId/comment/:commentId/edit", editCommentForBlog);
commentRouter.delete("/blog/:blogId/comment/:commentId", deleteCommentForBlog);
commentRouter.get("/comments/:blogId", getAllCommentsForBlog);

export default commentRouter;
