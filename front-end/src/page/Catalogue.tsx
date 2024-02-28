import axios from "axios";
import { Navigate } from 'react-router-dom';
import { RegisterLogin } from "../component/RegisterLogin";

interface Props{
    user: User,
    setUser: (newUser: User) => void;
}
export const Catalogue: React.FC<Props> = ({user, setUser}) => {
    // console.log(user)
    // const loginUrl = import.meta.env.VITE_BACK_END_BASE_URL + "/admin/user/authenticate"    

    // const login = async (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
    //     event.preventDefault();
    //     console.log(loginUrl)
    //     axios.post(loginUrl, { username: username, password: password})
    //     .then((response) => {
    //         if (response.status == 200){
    //             setUser({username, password})
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    return <>{user.username && user.password ? <div>Welcome {user.username}</div> : <Navigate to="/login"/> }</>
    };
      