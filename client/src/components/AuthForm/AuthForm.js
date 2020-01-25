import React, { Component } from "react";
import { Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import classes from "./AuthForm.module.css";

class AuthForm extends Component {
	state = { username: "", password: "" };

	updateInput = type => event => {
		this.setState({ [type]: event.target.value });
	};

	signup = event => {
		event.preventDefault();
		const { username, password } = this.state;
		this.props.auth.signup(username, password);
	};

	login = event => {
		event.preventDefault();
		const { username, password } = this.state;
		this.props.auth.login(username, password);
	};

	render() {
		const onLogin = this.props.location.pathname == "/login";
		const submit = onLogin ? this.login.bind(this) : this.signup.bind(this);
		const { username, password } = this.state;
		return (
			<div className={classes.AuthForm}>
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
					</FormGroup>
					<Button type="submit" onClick={submit}>
						{onLogin ? 'Log In' : 'Sign Up'}
					</Button>
				</form>
			</div>
		);
	}
}

export default AuthForm;
