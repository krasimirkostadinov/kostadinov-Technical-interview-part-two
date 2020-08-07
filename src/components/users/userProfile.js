import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import { updateUserData } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 20,
    maxWidth: 900,
    borderBottom: "1px solid",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  field: {
    margin: 10,
    width: 300,
  },
  submitButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const MemoizedUserImage = React.memo(({ id }) => {
  const classes = useStyles();

  let imageUrl = "";
  const { images } = useSelector((state) => state.users);

  if (images) {
    const thumbs = Object.values(images);
    const userImageData = thumbs[id - 1];
    if (typeof userImageData === "object") {
      imageUrl = userImageData.thumbnailUrl;
    }
  }

  return (
    <>
      <img className={classes.img} src={imageUrl} alt="User Image" />
    </>
  );
});

const MemoizedUserProfile = React.memo((user) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formUser, setFormUser] = useState(user);

  const handleSubmit = () => {
    dispatch(updateUserData(formUser)); // update user in Redux store
  };

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.id]: e.target.value });
  };

  const {
    id,
    name,
    username,
    email,
    address: { city, street, suite, ...restAddress },
    phone,
    website,
    thumbnailUrl,
    ...restPart
  } = formUser;

  const readonlyFields = { ...restPart, restAddress };
  const {
    company: { bs, name: companyName, catchPhrase },
    restAddress: {
      zipcode,
      geo: { lat, lng },
    },
  } = readonlyFields;

  return (
    <div className={classes.root} key={id}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <MemoizedUserImage {...user} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <form noValidate autoComplete="off">
                  <TextField
                    className={classes.field}
                    size="small"
                    id="name"
                    variant="outlined"
                    label="Name"
                    defaultValue={name}
                    onChange={handleChange}
                  />

                  <TextField
                    className={classes.field}
                    size="small"
                    id="username"
                    variant="outlined"
                    label="Username"
                    value={username}
                    onChange={handleChange}
                  />

                  <TextField
                    className={classes.field}
                    size="small"
                    id="email"
                    variant="outlined"
                    label="Email"
                    value={email}
                    onChange={handleChange}
                  />

                  <TextField
                    className={classes.field}
                    size="small"
                    id="phone"
                    variant="outlined"
                    label="Phone"
                    value={phone}
                    onChange={handleChange}
                  />

                  <TextField
                    className={classes.field}
                    size="small"
                    id="website"
                    variant="outlined"
                    label="Website"
                    value={website}
                    onChange={handleChange}
                  />

                  <TextField
                    className={classes.field}
                    size="small"
                    id="city"
                    variant="outlined"
                    label="City"
                    value={city}
                    onChange={handleChange}
                  />

                  <TextField
                    className={classes.field}
                    size="small"
                    id="street"
                    variant="outlined"
                    label="Street"
                    value={street}
                    onChange={handleChange}
                  />

                  <TextField
                    className={classes.field}
                    size="small"
                    id="suite"
                    variant="outlined"
                    label="Suite"
                    value={suite}
                    onChange={handleChange}
                  />

                  <ReadonlyTextField label="Bs" value={bs} />
                  <ReadonlyTextField label="Company Name" value={companyName} />
                  <ReadonlyTextField label="Catch phrase" value={catchPhrase} />
                  <ReadonlyTextField label="Zipcode" value={zipcode} />
                  <ReadonlyTextField label="Lat" value={lat} />
                  <ReadonlyTextField label="Lng" value={lng} />
                </form>
              </Grid>
              <Grid item className={classes.submitButton}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Update user
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
});

function ReadonlyTextField({ label, value }) {
  const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.field}
        size="small"
        variant="outlined"
        label={label}
        value={value}
        disabled
      />
    </>
  );
}

function UsersGrid(users) {
  return (
    <>
      {Object.values(users).map((user) => (
        <MemoizedUserProfile key={user.id} {...user} />
      ))}
    </>
  );
}

MemoizedUserProfile.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.object,
};

export default UsersGrid;
