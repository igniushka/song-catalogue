import axios from "axios";
import {RegisterLogin} from "../component/RegisterLogin"; 
import { Navigate } from "react-router-dom";

const registerUrl = import.meta.env.VITE_BACK_END_BASE_URL + "/admin/user/create"    

interface Props{
  user: User,
  setUser: (newUser: User) => void;
}

export const Register: React.FC<Props> =  ({user, setUser})  => {
  const register = async (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
    event.preventDefault();
    axios.post(registerUrl, { username: username, password: password})
    .then((response) => {
        if (response.status == 200){
            setUser({username, password})
        }
    })
    .catch((error) => {
        console.log(error);
    })
  };
  return <>{user.username && user.password ? < Navigate to="/catalogue" /> :     <RegisterLogin
    headerText="Create an account"
    buttonText="Register"
    bottomText="Have an account?"
    link_path="/login"
    link_text="Log In"
    on_submit={register}/> } </>
}