import axios from "axios";
import {
  CommentFormProps,
  LoginProps,
  ParamKeyProps,
  ParamProps,
} from "./types";

const instance = axios.create({
  baseURL: "",
});

const api = {
  getWPJSON: (params: ParamProps) => {
    const paramsStr = Object.keys(params)
      .map((item: ParamKeyProps) => {
        return `${item}=${params[item].join(",")}`;
      })
      .join("&");
    return instance.get(`/wp-json?${paramsStr}`);
  },
  getMenu: (params: ParamProps, id?: number) => {
    const paramsStr = Object.keys(params)
      .map((item: ParamKeyProps) => {
        return `${item}=${params[item].join(",")}`;
      })
      .join("&");
    return instance.get(
      `/wp-json/webivert/v1/menu${id ? `/${id}` : ""}?${paramsStr}`
    );
  },
  getPages: (params: ParamProps, id?: number) => {
    const paramsStr = Object.keys(params)
      .map((item: ParamKeyProps) => {
        return `${item}=${params[item].join(",")}`;
      })
      .join("&");
    return instance.get(
      `/wp-json/wp/v2/pages${id ? `/${id}` : ""}?${paramsStr}`
    );
  },
  getPosts: (params: ParamProps, id?: number) => {
    const paramsStr = Object.keys(params)
      .map((item: ParamKeyProps) => {
        return `${item}=${params[item].join(",")}`;
      })
      .join("&");
    return instance.get(
      `/wp-json/wp/v2/posts${id ? `/${id}` : ""}?${paramsStr}`
    );
  },
  getUsers: (params: ParamProps, id?: number) => {
    const paramsStr = Object.keys(params)
      .map((item: ParamKeyProps) => {
        return `${item}=${params[item].join(",")}`;
      })
      .join("&");
    return instance.get(
      `/wp-json/wp/v2/users${id ? `/${id}` : ""}?${paramsStr}`
    );
  },
  getMedia: (params: ParamProps, id: number) => {
    const paramsStr = Object.keys(params)
      .map((item: ParamKeyProps) => {
        return `${item}=${params[item].join(",")}`;
      })
      .join("&");
    return instance.get(`/wp-json/wp/v2/media/${id}?${paramsStr}`);
  },
  getComments: (params: ParamProps, id?: number) => {
    const paramsStr = Object.keys(params)
      .map((item: ParamKeyProps) => {
        return `${item}=${params[item].join(",")}`;
      })
      .join("&");
    return instance.get(
      `/wp-json/wp/v2/comments${id ? `/${id}` : ""}?${paramsStr}`
    );
  },
  signIn: (form: LoginProps) =>
    instance.post("/wp-json/jwt-auth/v1/token", form),
  postComment: (form: CommentFormProps, token: string) =>
    instance.post("/wp-json/wp/v2/comments", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default api;
