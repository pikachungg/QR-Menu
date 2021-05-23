import React, {useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export default function Home() {
    const [restaurantID, setRestaurantID] = useState("")
    const [restaurantName, setRestaurantName] = useState("");

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
                setRestaurantID(data._id);
                setRestaurantName(data.name);
            });
        }

        getInformation();
	}, []);

    const history = useHistory();

    return (
        <div className="home-background">
            <div className="home-container">
                <div className="home-left-side-card">
                    <div className="home-content">
                        <h1 className="home-title">{restaurantName}</h1>
                        <input type="file"></input>
                    </div>
                </div>
                <div className="home-right-side-card">

                </div>
            </div>
        </div>
    )
}
