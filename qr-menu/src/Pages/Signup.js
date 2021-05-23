import React, {useState} from 'react'
import {
    useHistory
} from "react-router-dom";

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const signup = (e) => {
        setPasswordError(false);
        setEmptyFields(false);
        e.preventDefault();

        if (password !== passwordVerification){
            setPasswordError(true);
            return;
        }
        if (email === "" || password === "" || restaurantName === "" || passwordVerification === ""){
            setEmptyFields(true);
            return;
        }
        if (!email.includes("@")){
            setEmailExistsError(true);
            return;
        }

        fetch('http://localhost:4000/signup', {
            method: "POST",
            headers:{
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                email, 
                password,
                restaurantName,
            }),
        })
        .then((res)=>{
            if (res.status === 400){
                setEmailError(true);
                return;
            }
            if (res.status === 200){
                history.push("/signin");
                return;
            }
        })
        .catch((error)=>{
            console.log("we are here", error);
        })
    }
    const history = useHistory();
    return (
        <div className="background">
            <div className="container">
                <div className="signup-card">
                    <form onSubmit={signup}>
                        <div className="signup-container">
                            <div className="fields">
                                <h1>Sign up</h1>
                                <input placeholder="Email" type="text" onChange={e=>setEmail(e.target.value)}></input>
                                <input placeholder="Restaurant Name" type="text" onChange={e=>setRestaurantName(e.target.value)}></input>
                                <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}></input>
                                <input placeholder="Confirm Password"type="password" onChange={e=>setPasswordVerification(e.target.value)}></input>
                                {passwordError ? <span style={{color: '#DC143C '}}>Passwords don't match!</span> : null}
                                {emptyFields ? <span style={{color: '#DC143C '}}>Fill up all the fields!</span> : null}
                                {emailError ? <span style={{color: '#DC143C '}}>Email already exists!</span> : null}
                                {emailExistsError ? <span style={{color: '#DC143C '}}>Invalid Email!</span> : null}
                            </div>
                            <button className="submit" type="submit">Create account!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
