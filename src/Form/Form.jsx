import { Grid, Box, Button } from "@material-ui/core";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useState } from "react";
function Form() {
  const [isLogin, setLogin] = useState(true);

  function handleClear() {
    setLogin(true);
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } 
    setOpen(false);
  };

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
      bgcolor="black"
      color="white"
    >
      <Box
        bgcolor="white"
        width={500}
        minHeight={550}
        boxShadow={3}
        display="flex"
        justifyContent="center"
        style={{ borderRadius: "30px" }}
      >
        <div
          style={{
            width: "80%",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "13px",
          }}
        >
          <Box display="flex">
            <Button
              style={{ width: "50%" }}
              variant="outlined"
              color="secondary"
              disabled={isLogin}
              onClick={() => setLogin(true)}
            >
              Log in
            </Button>
            <Button
              style={{ width: "50%" }}
              color="secondary"
              variant="outlined"
              disabled={!isLogin}
              onClick={() => setLogin(false)}
            >
              Sign Up
            </Button>
          </Box>
          {isLogin ? (
            <LogIn 
              handleClose={handleClose}
              open={open}
            />
          ) : (
            <SignUp handleClear={handleClear} handleOpen={handleOpen}/>
          )}
        </div>
      </Box>
    </Grid>
  );
}

export default Form;
