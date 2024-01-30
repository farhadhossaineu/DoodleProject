import mongoose, { Document, Model, Schema } from "mongoose";
export interface IBlog extends Document {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const blogSchema = new Schema<IBlog>(
  {
    userId: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const BlogModel: Model<IBlog> = mongoose.model("blog", blogSchema);

export default BlogModel;
