import "./App.css";
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Signin from './Pages/Signin';
import {UserContext} from './UserContext';
import React, {useState} from 'react'
function App() {

	const [user, setUser] = useState(null);


	return( 
		<Router>
			<Switch>
				<UserContext.Provider value={{user, setUser}}>
					<Route exact path="/signup" component={Signup}></Route>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/signin" component={Signin}></Route>
				</UserContext.Provider>
			</Switch>
		</Router>
	)
}

export default App;
