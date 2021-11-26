import {
  AppReducerStateProps,
  AppReducerActionProps,
  LOADING_GET_WPJSON,
  SUCCESS_GET_WPJSON,
  LOADING_GET_MENU,
  SUCCESS_GET_MENU,
  LOADING_GET_PAGES,
  SUCCESS_GET_PAGES,
  LOADING_GET_POSTS,
  SUCCESS_GET_POSTS,
  LOADING_GET_COMMENTS,
  SUCCESS_GET_COMMENTS,
  LOADING_SIGNIN,
  SUCCESS_SIGNIN,
  RESET_SIGNIN,
  LOADING_POST_COMMENT,
  SUCCESS_POST_COMMENT,
  RESET_POST_COMMENT,
} from "../_config/types";

const AppReducer = (
  state: AppReducerStateProps,
  action: AppReducerActionProps
) => {
  switch (action.type) {
    case LOADING_GET_WPJSON:
      return { ...state, isLoadingGetWPJSON: true };
    case SUCCESS_GET_WPJSON:
      return {
        ...state,
        isLoadingGetWPJSON: false,
        wpJSON: { ...action.payload },
      };

    case LOADING_GET_MENU:
      return { ...state, isLoadingGetMenu: true };

    case SUCCESS_GET_MENU: {
      let newMenu = [...state.menus];

      for (const keyMenu in action.payload) {
        newMenu = newMenu.filter(
          (item) => item.term_id !== action.payload[keyMenu].term_id
        );
      }

      newMenu = [...action.payload];

      return {
        ...state,
        isLoadingGetMenu: false,
        menus: [...newMenu],
      };
    }

    case LOADING_GET_PAGES:
      return { ...state, isLoadingGetPages: true };
    case SUCCESS_GET_PAGES:
      return {
        ...state,
        isLoadingGetPages: false,
        pages: [...action.payload],
      };
    case LOADING_GET_POSTS:
      return { ...state, isLoadingGetPosts: true, posts: [] };
    case SUCCESS_GET_POSTS:
      return {
        ...state,
        isLoadingGetPosts: false,
        posts: [...action.payload],
      };
    case LOADING_GET_COMMENTS:
      return { ...state, isLoadingGetComments: true };
    case SUCCESS_GET_COMMENTS:
      return {
        ...state,
        isLoadingGetComments: false,
        comments: [...action.payload],
      };
    case LOADING_SIGNIN:
      return { ...state, isLoadingSignIn: true, auth: null };
    case SUCCESS_SIGNIN:
      return {
        ...state,
        isLoadingSignIn: false,
        auth: { ...action.payload },
      };
    case RESET_SIGNIN:
      return {
        ...state,
        isLoadingSignIn: false,
        auth: null,
      };
    case LOADING_POST_COMMENT:
      return {
        ...state,
        isLoadingPostComment: false,
        postComment: null,
      };
    case SUCCESS_POST_COMMENT:
      return {
        ...state,
        isLoadingPostComment: false,
        postComment: { ...action.payload },
      };
    case RESET_POST_COMMENT:
      return {
        ...state,
        isLoadingPostComment: false,
        postComment: null,
      };
    default:
      return { ...state };
  }
};

export default AppReducer;
