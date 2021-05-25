import React, {useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import example from '../Assets/Images/example.png';

export default function Home() {
    const [restaurantName, setRestaurantName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
		const email = localStorage.getItem("email");
		if (!email){
			history.push("/signin");
		}

        const getInformation = async () => {
            let url = new URL("http://localhost:4000/getInformation");
            url.search = new URLSearchParams({email: email});
            await fetch(url, {
                method: "GET",
                headers:{ 
                    "Content-Type": "application/json", 
                },
                url: url,
            })
            .then(res => res.json())
            .then((data)=>{
                setRestaurantName(data.name);
                setImage('http://localhost:4000/QRCodes/' + data._id + '.png');
            });
        }
        
        getInformation();
	}, []);

    const submitFile = (e) => {
        e.preventDefault();
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push("/signin");
    }

    const history = useHistory();

    return (
        <div className="home-background">
            <div className="home-container">
                <div className="home-left-side-card">
                    <div className="home-content">
                        <h1 className="home-title">{restaurantName}</h1>
                        <form onClick={submitFile} className="home-submit-file">
                            <div className="instructions">
                                <p>Submit a .txt file with the menu in the format</p>
                                <p>Please follow the example for the file format 👉</p>
                                <ul>
                                    <li>- (Titles)</li>
                                    <li>-- (Subtitle)</li>
                                    <li>+ (New dish)</li>
                                    <li>[~] (Description)</li>
                                    <li>(~) (Price)</li>
                                </ul>
                            </div>
                            <input type="file"></input>
                            <button type="submit">Submit</button>
                            {!image ? <p>Loading...</p> : <img src={image} alt="QRCode"></img>}
                        </form>
                        <button className="logout-button" onClick={logout}>Log out</button>
                    </div>
                </div>
                <div className="home-right-side-card">
                    <div className="example-right-container">
                        <img src={example}></img>
                        <div className="example-menu">
                            <h1>Example </h1>
                            <p>- Main Course</p>
                            <p>+ Beer battered Haddock [hand-cutskin-on...] (8.5) (13.5)</p>
                            <p>+ Cheese & Onion Pie [mushy peas...] (12.0)</p>
                            <p>+ Minced Beef Suet Pudding [mushy peas...] (12.0)</p>
                            <p>+ Marinated Chicken Breast [sauteed potatoes...] (12.0)</p>
                            <p>+ Rump of Lamb [dauphinoise...] (20.0)</p>
                            <p>+ Creamy Pappardelle Pasta [courgette...] (12.0)</p>
                            <p>+ Thai Penang Curry [steamed rice...] (12.0)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
