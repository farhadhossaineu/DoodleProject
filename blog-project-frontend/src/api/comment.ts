import { AxiosResponse } from "axios";
import { axiosInstance } from "./baseApi";
import { IComment, ICommentBody } from "../type/types";

export function createCommentApi(blogId: string, body: ICommentBody) {
  return new Promise<AxiosResponse<IComment[]>>((resolve, reject) => {
    return axiosInstance
      .post(`comment/${blogId}/create`, body)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateCommentApi(
  blogId: string,
  commentId: string,
  body: ICommentBody,
) {
  return new Promise<AxiosResponse<IComment[]>>((resolve, reject) => {
    return axiosInstance
      .put(`blog/${blogId}/comment/${commentId}/edit`, body)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteCommentApi(blogId: string, commentId: string) {
  return new Promise<AxiosResponse<IComment[]>>((resolve, reject) => {
    return axiosInstance
      .delete(`blog/${blogId}/comment/${commentId}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getCommentsForBlogApi(blogId: string) {
  return new Promise<AxiosResponse<IComment[]>>((resolve, reject) => {
    return axiosInstance
      .get(`comments/${blogId}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
