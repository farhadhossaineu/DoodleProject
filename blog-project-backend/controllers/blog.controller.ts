import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import BlogModel from "../models/blog.model";
import { generateRandomId } from "../utils/common";

export const getBlogsWithComments = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogsDocs = await BlogModel.aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "id",
            foreignField: "blogId",
            as: "comments",
          },
        },
      ]);

      return res.status(201).json(blogsDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const createBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, title } = req.body as {
        title: string;
        body: string;
      };

      const id = generateRandomId();
      const userId = generateRandomId();

      await BlogModel.create({
        userId,
        id,
        title,
        body,
      });

      const blogDocs = await BlogModel.find();

      return res.status(201).json(blogDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const editBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { body, id, title, userId } = req.body as {
      userId: number;
      id: number;
      title: string;
      body: string;
    };
    const { blogId } = req.params;

    try {
      const blogDoc = await BlogModel.findOneAndUpdate(
        { id: blogId },
        { userId, id, title, body },
        { new: true },
      );

      if (!blogDoc) {
        return next(new ErrorHandler("Blog not found", 500));
      }
      const blogDocs = await BlogModel.find();
      return res.status(201).json(blogDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const getAllBlogs = CatchAsyncError(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const blogDocs = await BlogModel.find();
      return res.status(200).json(blogDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const deleteBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    try {
      await BlogModel.findOneAndDelete({ id: blogId });
      const blogDocs = await BlogModel.find();
      return res.status(200).json(blogDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const getBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    try {
      const blogDocs = await BlogModel.findOne({ id: blogId });
      return res.status(200).json(blogDocs);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
