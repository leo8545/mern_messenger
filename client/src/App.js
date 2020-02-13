import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import Chat from "./Components/Chat.jsx";
import Header from "./Components/Header";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Router>
					<Header />
					<Route path="/" exact component={HomePage} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/chat" component={Chat} />
				</Router>
			</React.Fragment>
		);
	}
}

export default App;
