import axios from "axios";
import { Navigate } from 'react-router-dom';
import { RegisterLogin } from "../component/RegisterLogin";
import { useState } from "react";
import { AlertColor } from "@mui/material";
import { Message } from "../types/MessageAlert";
import { createBasicAuthHeader } from "../helper.ts"
import { useUser } from "../context/Authentication.tsx"

export const Login = () => {
    const [message, setMessage] = useState<Message>({ text: '', severity: 'success' as AlertColor })
    const { user, setUser } = useUser();

    const login = (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
        const basicAuthHeader = createBasicAuthHeader('admin', import.meta.env.VITE_ADMIN_SECRET);
        const loginRequest = {
            method: 'post',
            url: "/admin/user/authenticate",
            data: { username: username, password: password },
            headers: {
                Authorization: basicAuthHeader
            }
        }
        event.preventDefault();
        axios(loginRequest)
            .then((response) => {
                if (response.status == 200) {
                    setUser({ username, password })
                }
            })
            .catch(() => {
                setMessage({text: 'Invalid username or password', severity: 'error' as AlertColor});
            })
    };
    return <>{user?.username && user?.password ? < Navigate to="/catalogue" />
        : <RegisterLogin
            headerText="Sign In"
            buttonText="Log In"
            bottomText="Don't have an account?"
            linkPath="/register"
            linkText="Sign Up"
            onSubmit={login}
            message={message}
            setMessage={setMessage} />
    }
    </>
}