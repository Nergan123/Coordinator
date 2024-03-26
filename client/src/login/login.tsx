import {useState} from "react";
import "./login.css";
import logo from "./logo.png";
import {useNavigate} from "react-router-dom";

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function handleLoginChange(event: any) {
        setLogin(event.target.value);
    }

    function handlePasswordChange(event: any) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password})
        });

        if (response.status === 200) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate("/")
        } else {
            alert("Login failed");
        }

    }

    const navigate = useNavigate();

    function handleRegister() {
        navigate("/Register");
    }

    return (
        <div id="login_menu" className="login-wrapper">
            <div className={"inner-wrapper"}>
                <img src={logo} alt={"Logo"} className={"logo-image"}/>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="Login" name="Login" required={true} minLength={4} maxLength={20} size={20}
                           style={{margin: "0 0 5%"}} placeholder="Login" value={login} onChange={handleLoginChange}/>
                    <input type="password" id="Password" name="Password" required={true} minLength={4} maxLength={20}
                           size={20}
                           style={{margin: "0 0 5%"}} placeholder="Password" value={password}
                           onChange={handlePasswordChange}/>
                    <input type="submit" id="Submit" name="Submit" size={20} value="Submit" style={{margin: "0 0 5%"}}/>
                </form>
            </div>
            <button className="register-button" onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Login;