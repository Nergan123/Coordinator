import {useState} from "react";
import "./register.css";
import PasswordMismatch from "./passwordMismatch";
import {useNavigate} from "react-router-dom";

function Register() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const navigate = useNavigate();

    function handleLogin(event: any) {
        setLogin(event.target.value);
    }

    function handlePassword(event: any) {
        setPassword(event.target.value);
    }

    function handlePasswordRepeat(event: any) {
        setPasswordRepeat(event.target.value);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if (checkPassword()) {
            register().then(() => {});
        }
    }

    async function register() {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password})
        });

        if (response.status === 200) {
            navigate("/Login")
        } else {
            alert("Registration failed");
        }
    }

    function checkPassword() {
        if (password !== passwordRepeat) {
            setPasswordMismatch(true);

            return false;
        }

        return true;
    }

    return (
        <div id="register_menu" className="login-wrapper">
            {passwordMismatch && <PasswordMismatch setError={setPasswordMismatch}/>}
            <form onSubmit={handleSubmit}>
                <input type="text"
                       id="Login"
                       name="Login"
                       required={true}
                       minLength={4}
                       maxLength={20}
                       size={20}
                       placeholder="Login"
                       style={{margin: "0 0 5%"}}
                       value={login}
                       onChange={handleLogin}
                />
                <input type="password"
                       id="Password"
                       name="Password"
                       required={true}
                       minLength={4}
                       maxLength={20}
                       size={20}
                       placeholder="Password"
                       style={{margin: "0 0 5%"}}
                       value={password}
                       onChange={handlePassword}
                />
                <input type="password"
                       id="Repeat_password"
                       name="Repeat_password"
                       required={true}
                       minLength={4}
                       maxLength={20}
                       size={20}
                       placeholder="Repeat Password"
                       style={{margin: "0 0 5%"}}
                       value={passwordRepeat}
                       onChange={handlePasswordRepeat}
                />
                <input type="submit" id="Submit" name="Submit" size={20} value="Submit"/>
            </form>
        </div>
    );
}

export default Register;