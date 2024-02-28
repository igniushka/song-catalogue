import {RegisterLogin} from "../component/RegisterLogin"; 

export default function Register(){
    return <RegisterLogin
    headerText="Create an account"
    buttonText="Register"
    bottomText="Have an account?"
    link_path="/login"
    link_text="Log In"/>
}