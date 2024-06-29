import RegisterForm from "./register_form/RegisterForm";
import { register } from "../../AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

function Register(props) {
  const disPatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { closeDialog } = props;

  const handleSubmit = async (values) => {
    try {
      const action = register(values);
      const resultAction = await disPatch(action);
      const newUser = unwrapResult(resultAction);
      console.log(newUser);
      enqueueSnackbar("Register successfully", { variant: "success" });

      if (closeDialog) {
        closeDialog();
      }
    } catch (err) {
      enqueueSnackbar("Error: " + err.message, { variant: "error" });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
