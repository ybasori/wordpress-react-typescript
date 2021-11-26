import { ReactNode } from "react";

export type ParamKeyProps = "slug" | "_fields" | string;

export type ParamProps = {
  [param in ParamKeyProps]: string[];
};

export type LoginProps = {
  username: string;
  password: string;
};

type MenuListProps = {
  id: number;
  object_id: string;
  menu_item_parent: string;
  title: string;
  type: string;
  object?: {
    slug: string;
  };
  url: string;
};

type MenuProps = {
  term_id: number;
  slug: string;
  list: MenuListProps[];
};
export type FeaturedMediaProps = {
  title: { rendered: string };
  media_details: {
    sizes: {
      thumbnail: {
        source_url: string;
      };
      full: {
        source_url: string;
      };
    };
  };
  guid: {
    rendered: string;
  };
};
export type PageProps = {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  date: string;
  author: {
    name: string;
    slug: string;
  };
  featured_media?: FeaturedMediaProps;
  id?: number;
  type: string;
};
export type PostProps = {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  author: {
    name: string;
    slug: string;
  };
  featured_media?: FeaturedMediaProps;
  id?: number;
  type: string;
  comment_count?: number;
  format?: string;
};
export type CommentProps = {
  author_name: string;
  author_avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  content: { rendered: string };
  parent: number;
  id: number;
  date: string;
};

type AuthProps = {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
};
export type CommentFormProps = {
  content: string;
  post: number;
  parent: number;
};

export type AppReducerStateProps = {
  isLoadingGetWPJSON: boolean;
  wpJSON: {
    name: string;
    description: string;
  };
  isLoadingGetMenu: boolean;
  menus: MenuProps[];
  isLoadingGetPages: boolean;
  pages: PageProps[];
  isLoadingGetPosts: boolean;
  posts: PostProps[];
  isLoadingGetComments: boolean;
  comments: CommentProps[];
  isLoadingSignIn: boolean;
  auth: null | AuthProps;
  isLoadingPostComment: boolean;
  postComment: CommentProps | null;
};

export interface Props extends AppReducerStateProps {
  getWPJSON: (params: ParamProps) => void;
  getMenu: (params: ParamProps) => void;
  getPages: (params: ParamProps) => void;
  getPosts: (params: ParamProps) => void;
  getComments: (params: ParamProps) => void;
  onOpenLoginModal: () => void;
  onCloseLoginModal: () => void;
  onLogin: (form: LoginProps) => void;
  onLogout: () => void;
  onPostComment: (form: CommentFormProps, token: string) => void;
  onResetPostComment: () => void;
  onOpenLoadingModal: () => void;
  onCloseLoadingModal: () => void;
}

export type AppReducerActionProps = { type: string; payload?: any };

export interface AppProviderProps {
  children: ReactNode;
}

export const LOADING_GET_WPJSON = "LOADING_GET_WPJSON";
export const SUCCESS_GET_WPJSON = "SUCCESS_GET_WPJSON";
export const ERROR_GET_WPJSON = "ERROR_GET_WPJSON";

export const LOADING_GET_MENU = "LOADING_GET_MENU";
export const SUCCESS_GET_MENU = "SUCCESS_GET_MENU";
export const ERROR_GET_MENU = "ERROR_GET_MENU";

export const LOADING_GET_PAGES = "LOADING_GET_PAGES";
export const SUCCESS_GET_PAGES = "SUCCESS_GET_PAGES";
export const ERROR_GET_PAGES = "ERROR_GET_PAGES";

export const LOADING_GET_POSTS = "LOADING_GET_POSTS";
export const SUCCESS_GET_POSTS = "SUCCESS_GET_POSTS";
export const ERROR_GET_POSTS = "ERROR_GET_POSTS";

export const LOADING_GET_COMMENTS = "LOADING_GET_COMMENTS";
export const SUCCESS_GET_COMMENTS = "SUCCESS_GET_COMMENTS";
export const ERROR_GET_COMMENTS = "ERROR_GET_COMMENTS";

export const LOADING_SIGNIN = "LOADING_SIGNIN";
export const SUCCESS_SIGNIN = "SUCCESS_SIGNIN";
export const ERROR_SIGNIN = "ERROR_SIGNIN";
export const RESET_SIGNIN = "RESET_SIGNIN";

export const RESET_POST_COMMENT = "RESET_POST_COMMENT";
export const LOADING_POST_COMMENT = "LOADING_POST_COMMENT";
export const SUCCESS_POST_COMMENT = "SUCCESS_POST_COMMENT";
export const ERROR_POST_COMMENT = "ERROR_POST_COMMENT";
