export function getUsersStart() {
  return {
    type: "GET_USERS#START",
    message: "getting user started",
  };
}

export function getUsersCompleted(users) {
  return {
    type: "GET_USERS#COMPLETE",
    message: "getting users completed",
    data: users,
  };
}

export function getUsersFail(error) {
  return {
    type: "GET_USERS#FAILURE",
    message: "getting users failed",
    error: error,
  };
}

export function getImagesStarted() {
  return {
    type: "GET_USERS_IMAGE#STARTED",
    message: "getting user images started",
  };
}

export function getImagesFailed(error) {
  return {
    type: "GET_USERS_IMAGE#FAILED",
    message: "getting user images failed",
    error: error,
  };
}

export function getImagesCompleted(images) {
  return {
    type: "GET_USERS_IMAGE#COMPLETE",
    message: "getting user images completed",
    data: images,
  };
}

export function updateUserData(userData) {
  return {
    type: "UPDATE_USER",
    data: userData,
  };
}
