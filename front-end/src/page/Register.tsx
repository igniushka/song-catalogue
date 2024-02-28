import {RegisterLogin} from "../component/RegisterLogin"; 

export const Register = ()  => {
    const register = (event: React.MouseEvent<HTMLButtonElement>, username: string, password: string) => {
        event.preventDefault();
        console.log('Email:', username, 'Password:', password);
      };
    return <RegisterLogin
    headerText="Create an account"
    buttonText="Register"
    bottomText="Have an account?"
    link_path="/login"
    link_text="Log In"
    on_submit={register}/>
}