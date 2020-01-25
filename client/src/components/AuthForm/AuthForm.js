import React, { Component } from "react";
import { Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import classes from "./AuthForm.module.css";

class AuthForm extends Component {
	state = { email: "", password: "" };

	updateInput = type => event => {
		this.setState({ [type]: event.target.value });
	};

	signup = event => {
		event.preventDefault();
		const { email, password } = this.state;
		this.props.auth.signup(email, password);
	};

	login = event => {
		event.preventDefault();
		const { email, password } = this.state;
		this.props.auth.login(email, password);
	};

	render() {
		const onLogin = this.props.location.pathname == "/login";
		const submit = onLogin ? this.login.bind(this) : this.signup.bind(this);
		const { email, password } = this.state;
		return (
			<div className={classes.AuthForm}>
				<form>
					<FormGroup>
						<FormLabel>Email address</FormLabel>
						<FormControl
							type="text"
							value={email}
							placeholder="Enter email"
							onChange={this.updateInput("email")}
						></FormControl>
						<br />
						<FormLabel>Password</FormLabel>
						<FormControl
							type="password"
							value={password}
							placeholder="Enter password"
							onChange={this.updateInput("password")}
						></FormControl>
					</FormGroup>
					<Button type="submit" onClick={submit} style={{
						backgroundColor: '#207ea2',
						borderColor: '#187fa7'
					}}>
						{onLogin ? 'Log In' : 'Sign Up'}
					</Button>
				</form>
			</div>
		);
	}
}

export default AuthForm;
