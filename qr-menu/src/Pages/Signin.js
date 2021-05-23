import React, {useState, useContext}from 'react'
import { UserContext } from '../UserContext';
import {
	Link,
    useHistory
} from "react-router-dom";

export default function Signin() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);

    const signin = (e) => {
        setEmptyFields(false);
        setInvalidCredentials(false);
        e.preventDefault();
        if (user !== "" && password !== ""){
            fetch('http://localhost:4000/signin', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            .then((res)=>{
                if (res.status === 404){
                    setInvalidCredentials(true);
                    return;
                }
                if (res.status === 200){
                    localStorage.setItem("email", email);
                    setUser(email);
                    history.push("/");
                    return;
                }
            })
            .catch((error)=>{
                console.log("we are here", error);
            })
        }
        else {
            setEmptyFields(true);
            return;
        }
    }
    const history = useHistory();
    return (
        <div className="background">
            <div className="container">
                <div className="signup-card">
                    <form onSubmit={signin}>
                        <div className="signup-container">
                            <div className="fields">
                                <h1>Sign in</h1>
                                <input placeholder="Username" type="text" onChange={e=>setEmail(e.target.value)}></input>
                                <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}></input>
                                {invalidCredentials ? <span style={{color: '#DC143C '}}>Invalid credentials!</span> : null}
                                {emptyFields ? <span style={{color: '#DC143C '}}>Empty Fields!</span> : null}
                            </div>
                            <div className="button-side">
                                <button className="submit" type="submit">Sign in!</button>
                                <p>Don't have an account yet? <Link to="/signup">Join for free!</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
