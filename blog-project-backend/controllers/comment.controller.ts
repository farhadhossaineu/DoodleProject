import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { generateRandomId } from "../utils/common";
import CommentModel from "../models/comment.model";

export const createCommentForBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    const { name, email, body } = req.body as {
      name: string;
      email: string;
      body: string;
    };

    const id = generateRandomId();

    try {
      await CommentModel.create({
        name,
        id,
        blogId,
        email,
        body,
      });

      const commendDocs = await CommentModel.find({ blogId });

      return res.status(201).json(commendDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const editCommentForBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, body } = req.body as {
      name: string;
      email: string;
      body: string;
    };
    const { blogId, commentId } = req.params;

    try {
      const commentDoc = await CommentModel.findOneAndUpdate(
        { blogId, id: commentId },
        { name, email, body },
        { new: true },
      );

      if (!commentDoc) {
        return next(new ErrorHandler("Blog not found", 500));
      }
      const commendDocs = await CommentModel.find({ blogId });
      return res.status(201).json(commendDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const getAllCommentsForBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    try {
      const commentDocs = await CommentModel.find({ blogId });
      return res.status(200).json(commentDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const deleteCommentForBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId, commentId } = req.params;
    try {
      await CommentModel.findOneAndDelete({ blogId, id: commentId });
      const commentDocs = await CommentModel.find({ blogId });
      return res.status(200).json(commentDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
