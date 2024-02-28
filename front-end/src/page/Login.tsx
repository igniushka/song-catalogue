import {RegisterLogin} from "../component/RegisterLogin"; 

export default function Register(){
    return <RegisterLogin
    headerText="Sign In"
    buttonText="Log In"
    bottomText="Don't have an account?"
    link_path="/register"
    link_text="Sign Up"/>
}