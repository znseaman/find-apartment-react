import React, { Component } from "react";
import { Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import classes from "./AuthForm.module.css";

class AuthForm extends Component {
	state = { username: "", password: "" };

	updateInput = type => event => {
		this.setState({ [type]: event.target.value });
	};

	signup = () => {
		console.log("this.state", this.state);
	};

	login = () => {
		console.log("this.state", this.state);
	};

	render() {
		const { username, password } = this.state;
		return (
			<div className={classes.AuthForm}>
				<h2>Find Apartment</h2>
				<FormGroup>
					<FormControl
						type="text"
						value={username}
						placeholder="username"
						onChange={this.updateInput("username")}
					></FormControl>
					<br />
					<FormControl
						type="password"
						value={password}
						placeholder="password"
						onChange={this.updateInput("password")}
					></FormControl>
					<Button onClick={this.login}>Log In</Button>
					<span> or </span>
					<Button onClick={this.signup}>Sign Up</Button>
				</FormGroup>
			</div>
		);
	}
}

export default AuthForm;
