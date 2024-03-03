import axios from "axios";
import {RegisterLogin} from "../component/RegisterLogin"; 
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Message } from "../types/MessageAlert";
import { AlertColor } from "@mui/material";

const registerUrl = import.meta.env.VITE_BACK_END_BASE_URL + "/admin/user/create"    

interface Props{
  user: User,
  setUser: (newUser: User) => void;
}

export const Register: React.FC<Props> =  ({user, setUser})  => {
  const [message, setMessage] = useState<Message>({text: '', severity: 'success' as AlertColor})
  const register = async (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
    event.preventDefault();
    axios.post(registerUrl, { username: username, password: password})
    .then((response) => {
        if (response.status == 200){
            setUser({username, password})
        }
    })
    .catch((error) => {
      console.log(error)
      if (error.status === 409){
        setMessage({text: "Please choose a different username", severity: "warning" as AlertColor})
      } else {
        setMessage({text: "Failed to create user", severity: "error" as AlertColor})
      }
    })
  };
  return <>{user.username && user.password ? < Navigate to="/catalogue" /> :  <RegisterLogin
    headerText="Create an account"
    buttonText="Register"
    bottomText="Have an account?"
    linkPath="/login"
    linkText="Log In"
    onSubmit={register}
    message={message}
    setMessage={setMessage}/> } </>
}