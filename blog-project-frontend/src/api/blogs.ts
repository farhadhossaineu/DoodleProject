import { AxiosResponse } from "axios";
import { axiosInstance } from "./baseApi";
import { IBlog, IBlogBody } from "../type/types";

export function createBlogAPi(body: IBlogBody) {
  return new Promise<AxiosResponse<IBlog[]>>((resolve, reject) => {
    return axiosInstance
      .post(`blog/create`, body)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateBlogApi(blogId: string, body: IBlogBody) {
  return new Promise<AxiosResponse<IBlog[]>>((resolve, reject) => {
    return axiosInstance
      .put(`blog/${blogId}/edit`, body)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteCommentApi(blogId: string) {
  return new Promise<AxiosResponse<IBlog[]>>((resolve, reject) => {
    return axiosInstance
      .delete(`${blogId}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getBlogsApi() {
  return new Promise<AxiosResponse<IBlog[]>>((resolve, reject) => {
    return axiosInstance
      .get(`blogs`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getBlogWithCommentsApi() {
  return new Promise<AxiosResponse<IBlog[]>>((resolve, reject) => {
    return axiosInstance
      .get(`blogsWithComments`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getBlogApi(blogId: string) {
  return new Promise<AxiosResponse<IBlog[]>>((resolve, reject) => {
    return axiosInstance
      .get(`blog/${blogId}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
