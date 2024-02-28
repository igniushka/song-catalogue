import axios from "axios";
import {RegisterLogin} from "../component/RegisterLogin";

interface Props{
    user: User,
    setUser: (newUser: User) => void;
}
export const Login: React.FC<Props> = ({user, setUser}) => {
    console.log(user)
    const loginUrl = import.meta.env.VITE_BACK_END_BASE_URL + "/admin/user/authenticate"    

    const login = async (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
        event.preventDefault();
        console.log(loginUrl)
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

    return <RegisterLogin
    headerText="Sign In"
    buttonText="Log In"
    bottomText="Don't have an account?"
    link_path="/register"
    link_text="Sign Up"
    on_submit={login}/>
}   