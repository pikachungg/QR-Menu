import React, {useState} from 'react'

export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("");
    const [restaurantName, setRestaurantName] = useState("");

    const signup = () => {

    }

    return (
        <div className="background">
            <div className="container">
                <div className="signup-card">
                    <form onSubmit={signup}>
                        <div className="signup-container">
                            <div className="signup-fields">
                                <h1>Sign up</h1>
                                <input placeholder="Username" type="text" onChange={e=>setUsername(e.target.value)}></input>
                                <input placeholder="Restaurant Name" type="text" onChange={e=>setRestaurantName(e.target.value)}></input>
                                <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}></input>
                                <input placeholder="Confirm Password"type="password" onChange={e=>setPasswordVerification(e.target.value)}></input>
                            </div>
                            <button className="signup-submit" type="submit">Create account!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
