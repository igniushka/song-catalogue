import axios from "axios";
import { Navigate } from 'react-router-dom';
import { RegisterLogin } from "../component/RegisterLogin";
import { useState } from "react";
import { AlertColor } from "@mui/material";
import { Message } from "../types/MessageAlert";
import {createBasicAuthHeader} from "../helper.ts"
interface Props{
    user: User,
    setUser: (newUser: User) => void;
}
export const Login: React.FC<Props> = ({user, setUser}) => {
    const [message, setMessage] = useState<Message>({text: '', severity: 'success' as AlertColor})

    const login = (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
        const basicAuthHeader = createBasicAuthHeader('admin', import.meta.env.VITE_ADMIN_SECRET);
        const loginRequest = {
            method: 'post',
            url: "/admin/user/authenticate",
            data: { username: username, password: password},
            headers: {
                Authorization: basicAuthHeader
            }
          }
        event.preventDefault();
        axios(loginRequest)
        .then((response) => {
            if (response.status == 200){
                setUser({username, password})
            }
        })
        .catch((error) => {
            console.log(error);
        })
      };
      return <>{user.username && user.password ? < Navigate to="/catalogue" /> 
      : <RegisterLogin 
            headerText="Sign In"
            buttonText="Log In"
            bottomText="Don't have an account?"
            linkPath="/register"
            linkText="Sign Up"
            onSubmit={login}
            message={message}
            setMessage={setMessage}/>
            }
        </>
    }