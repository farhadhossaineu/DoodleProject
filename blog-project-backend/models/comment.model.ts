import mongoose, { Document, Model, Schema } from "mongoose";
export interface IBlog extends Document {
  blogId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const commentSchema = new Schema<IBlog>({
  blogId: {
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
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const CommentModel: Model<IBlog> = mongoose.model("comment", commentSchema);

export default CommentModel;
