import React from "react";
import { TextField, Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Alert2(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ModalUser = ({ open2, handleClose2, data }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open2}
      onClose={handleClose2}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open2}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Successful login</h2>
          <p id="transition-modal-description">Hello, {data.username}</p>
          <p id="transition-modal-description">You are {data.age} years old</p>
          <p id="transition-modal-description">Your email: {data.email}</p>
          <p id="transition-modal-description">
            Your password: {data.password1}
          </p>
        </div>
      </Fade>
    </Modal>
  );
};

function LogIn({ handleClose, open }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [open2, setOpen] = useState(false);
  const [data, setData] = useState({});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  function findUser(data) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    for (const user of users) {
      if (user.email === data.email && user.password1 === data.password) {
        return user;
      }
    }
  }

  const onSubmit = (data) => {
    handleOpen();
    setData(findUser(data));
  };

  return (
    <Box display="flex" alignItems="center" style={{ height: "70%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          label="Email"
          variant="outlined"
          type="email"
          helperText="Enter your email"
          style={{ width: "100%" }}
          {...register("email")}
        />
        <TextField
          required
          label="Password"
          variant="outlined"
          type="password"
          helperText="Enter your password"
          style={{ width: "100%", marginTop: "20px" }}
          {...register("password", {
            validate: (value) => {
              let users = JSON.parse(localStorage.getItem("users")) || [];
              for (const user of users) {
                if (user.email === watch("email") && user.password1 === value) {
                  return true;
                }
              }
              return "Incorrect e-mail or password.";
            },
          })}
        />
        {errors.password && (
          <Alert
            variant="outlined"
            severity="error"
            style={{ marginTop: "20px" }}
          >
            {errors.password.message}
          </Alert>
        )}
        <Button
          variant="contained"
          style={{
            background: "linear-gradient(45deg, #57C84D 30%, #83D475 90%)",
            borderRadius: 3,
            border: 0,
            color: "white",
            height: 48,
            padding: "0 30px",
            boxShadow: "0 3px 5px 2px rgba(131, 212, 117, .3)",
            marginTop: "15px",
            width: "100%",
          }}
          type="submit"
        >
          Log in
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          style={{ bottom: "150px" }}
        >
          <Alert2 onClose={handleClose} severity="success">
            Successful registration
          </Alert2>
        </Snackbar>
      </form>
      <ModalUser open2={open2} handleClose2={handleClose2} data={data} />
    </Box>
  );
}

export default LogIn;
