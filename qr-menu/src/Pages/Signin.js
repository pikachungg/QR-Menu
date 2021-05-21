import React, {useState, useContext}from 'react'
import { UserContext } from '../UserContext';
import {
	Link,
    useHistory
} from "react-router-dom";

export default function Signin() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);

    const signin = (e) => {
        
    }

    return (
        <div className="background">
            <div className="container">
                <div className="signin-card">
                    <form onSubmit={signin}>
                        <div className="signup-container">
                            <div className="signup-fields">
                                <h1>Sign in</h1>
                                <input placeholder="Username" type="text" onChange={e=>setUsername(e.target.value)}></input>
                                <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}></input>
                            </div>
                            <div className="button-side">
                                <button className="signin-submit" type="submit">Sign in!</button>
                                <p>Don't have an account yet? <Link to="/signup">Join for free!</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
