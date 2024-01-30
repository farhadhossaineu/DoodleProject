export interface IComment {
  id: string;
  name: string;
  email: string;
  blogId: string;
  body: string;
}

export interface IBlog {
  id: string;
  userId: string;
  body: string;
  isFavorite?: boolean;
  title: string;
  comments?: IComment[];
}

export interface ICommentBody {
  name?: string;
  email?: string;
  body?: string;
}

export interface IBlogBody {
  title?: string;
  body?: string;
}
