import { Box, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

function SignUp({ handleClear, handleOpen }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    handleOpen();
    handleClear();
  };

  function isEmpty(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Box display="flex">
        <TextField
          required
          style={{ width: "60%" }}
          error={!isEmpty(errors.username)}
          label="Username"
          variant="outlined"
          helperText={
            errors.username ? errors.username.message : "Enter your username"
          }
          {...register("username", {
            minLength: {
              value: 3,
              message: "The username cannot be less than 3 characters ",
            },
            maxLength: {
              value: 30,
              message: "The username cannot be longer than 30 characters",
            },
          })}
        />
        <TextField
          required
          style={{ width: "40%", marginLeft: "10px" }}
          error={!isEmpty(errors.age)}
          label="Age"
          helperText={errors.age ? errors.age.message : "Enter how old are you"}
          variant="outlined"
          type="number"
          {...register("age", {
            min: {
              value: 18,
              message: "Come back when you are 18 :)",
            },
            max: {
              value: 100,
              message: "Impossible o_O",
            },
          })}
        />
      </Box>
      <TextField
        required
        error={!isEmpty(errors.email)}
        label="Email"
        variant="outlined"
        type="email"
        helperText={errors.email ? errors.email.message : "Enter your email"}
        {...register("email", {
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid email",
          },
          validate: (value) => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            for (const user of users) {
              if (user.email === value) {
                return "User with such email is already registered";
              }
            }
            return true;
          },
        })}
      />
      <TextField
        required
        error={!isEmpty(errors.password1)}
        label="Password"
        variant="outlined"
        type="password"
        helperText={
          errors.password1 ? errors.password1.message : "Enter your password"
        }
        {...register("password1", {
          minLength: {
            value: 6,
            message: "The password must contain at least 6 characters",
          },
          validate: {
            isUppercase: (value) =>
              /[A-Z]/g.test(value) ||
              "Password must be contain at least one uppercase letter",
            isLowerCase: (value) =>
              /[a-z]/g.test(value) ||
              "Password must be contain at least one lowercase letter",
            isDigit: (value) =>
              /[0-9]/g.test(value) ||
              "Password must be contain at least one digit",
          },
        })}
      />
      <TextField
        required
        error={!isEmpty(errors.password2)}
        label="Confirm password"
        helperText={
          errors.password2
            ? errors.password2.message
            : "Confirm password your password"
        }
        variant="outlined"
        type="password"
        {...register("password2", {
          validate: {
            isLong: (value) =>
              value === watch("password1") || "Passwords do not match",
          },
        })}
      />
      <Button
        variant="contained"
        style={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          borderRadius: 3,
          border: 0,
          color: "white",
          height: 48,
          padding: "0 30px",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          marginBottom: "15px",
        }}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default SignUp;
