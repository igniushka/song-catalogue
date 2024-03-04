import axios from "axios";
import { RegisterLogin } from "../component/RegisterLogin";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Message } from "../types/MessageAlert";
import { AlertColor } from "@mui/material";
import { createBasicAuthHeader } from "../helper";


interface Props {
  user: User,
  setUser: (newUser: User) => void;
}

export const Register: React.FC<Props> = ({ user, setUser }) => {
  const [message, setMessage] = useState<Message>({ text: '', severity: 'success' as AlertColor })
  const register = async (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
    event.preventDefault();
    const basicAuthHeader = createBasicAuthHeader('admin', import.meta.env.VITE_ADMIN_SECRET);
    const registerRequest = {
      method: 'post',
      url: "/admin/user/create",
      data: { username: username, password: password },
      headers: {
        Authorization: basicAuthHeader
      }
    }
    axios(registerRequest)
      .then((response) => {
        if (response.status == 200) {
          setUser({ username, password })
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.status === 409) {
          setMessage({ text: "Please choose a different username", severity: "warning" as AlertColor })
        } else {
          setMessage({ text: "Failed to create user", severity: "error" as AlertColor })
        }
      })
  };
  return <>{user.username && user.password ? < Navigate to="/catalogue" /> : <RegisterLogin
    headerText="Create an account"
    buttonText="Register"
    bottomText="Have an account?"
    linkPath="/login"
    linkText="Log In"
    onSubmit={register}
    message={message}
    setMessage={setMessage} />} </>
}