const initialState = {
  loading: false,
  success: false,
  error: "",
  users: {},
  images: {},
};

export default function usersReducer(state = initialState, payload) {
  switch (payload.type) {
    case "GET_USERS#START":
      return { ...state, loading: true };
    case "GET_USERS#COMPLETE":
      return {
        ...state,
        loading: false,
        users: payload.data,
      };
    case "GET_USERS#FAILURE":
      return { ...state, error: payload.error, loading: false };
    case "GET_USERS_IMAGE#STARTED":
      return { ...state, loading: true };
    case "GET_USERS_IMAGE#COMPLETE":
      return {
        ...state,
        loading: false,
        images: payload.data,
      };
    case "GET_USERS_IMAGE#FAILED":
      return { ...state, error: payload.error, loading: false };
    case "UPDATE_USER":
      return {
        ...state,
        users: {
          ...state.users,
          [payload.data.id - 1]: {
            ...payload.data,
          },
        },
      };

    default:
      return state;
  }
}
