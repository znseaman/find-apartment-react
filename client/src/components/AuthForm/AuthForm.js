import React, { Component } from "react";
import { Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import classes from "./AuthForm.module.css";

class AuthForm extends Component {
	state = { username: "", password: "" };

	updateInput = type => event => {
		this.setState({ [type]: event.target.value });
	};

	signup = () => {
		const { username, password } = this.state;
		this.props.auth.signup(username, password);
	};

	login = event => {
		event.preventDefault();
		const { username, password } = this.state;
		this.props.auth.login(username, password);
	};

	render() {
		const { username, password } = this.state;
		return (
			<div className={classes.AuthForm}>
				<h2>Find Apartment</h2>
				<form>
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
						<Button type="submit" onClick={this.login}>
							Log In
						</Button>
					</FormGroup>
				</form>
				<Button onClick={this.signup}>Sign Up</Button>
			</div>
		);
	}
}

export default AuthForm;
