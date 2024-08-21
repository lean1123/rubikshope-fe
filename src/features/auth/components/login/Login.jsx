import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { login } from "../../AuthSlice";
import LoginForm from "./login_form/LoginForm";
import { setCartID } from "../../../cart/CartSlice";

function Login(props) {
  const disPatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { closeDialog } = props;

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await disPatch(action);

      const loginedUser = unwrapResult(resultAction);

      if (loginedUser.userID) {
        enqueueSnackbar("Welcome to Rubikshop! " + loginedUser.fullName, {
          variant: "success",
        });

        disPatch(setCartID(loginedUser.userID));
      }

      if (closeDialog) {
        closeDialog();
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error: " + err.message.message, { variant: "error" });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
