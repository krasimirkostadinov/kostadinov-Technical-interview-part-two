import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import UsersGrid from "./userProfile";
import {
  getUsersStart,
  getUsersCompleted,
  getUsersFail,
} from "../../actions/userActions";

import {
  getImagesStarted,
  getImagesCompleted,
  getImagesFailed,
} from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    textAlign: "center",
  },
  usersContainer: {
    display: "inline-block",
  },
}));

export default function UsersContainer() {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const classes = useStyles();

  const getUsers = async () => {
    dispatch(getUsersStart());
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        dispatch(getUsersCompleted(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };

  const getImages = async () => {
    dispatch(getImagesStarted());
    await axios
      .get("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=10")
      .then((response) => {
        dispatch(getImagesCompleted(response.data));
      })
      .catch((err) => {
        dispatch(getImagesFailed(err));
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getImages();
  }, []);

  if (loading || !users) {
    return (
      <div className={classes.pageContainer}>
        <h1>Getting user data...</h1>
        <CircularProgress size="5rem" />
      </div>
    );
  }

  return (
    <div className={classes.pageContainer}>
      <h1>Users overview</h1>
      <div className={classes.usersContainer}>
        <UsersGrid {...users} />
      </div>
    </div>
  );
}
