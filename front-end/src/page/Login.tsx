import axios from "axios";
import { Navigate } from 'react-router-dom';
import { RegisterLogin } from "../component/RegisterLogin";
import { useState } from "react";
import { AlertColor } from "@mui/material";
import { Message } from "../types/MessageAlert";

interface Props{
    user: User,
    setUser: (newUser: User) => void;
}
export const Login: React.FC<Props> = ({user, setUser}) => {
    const [message, setMessage] = useState<Message>({text: '', severity: 'success' as AlertColor})
    const loginUrl = import.meta.env.VITE_BACK_END_BASE_URL + "/admin/user/authenticate"    

    const login = async (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
        event.preventDefault();
        axios.post(loginUrl, { username: username, password: password})
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