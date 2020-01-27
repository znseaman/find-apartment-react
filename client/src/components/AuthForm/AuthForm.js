import React, { Component } from "react";
import { Button, Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import classes from "./AuthForm.module.css";

class AuthForm extends Component {
	state = { email: "", password: "" };

	updateInput = type => event => {
		this.setState({ [type]: event.target.value });
	};

	signup = event => {
		event.preventDefault();
		const { email, password } = this.state;

		// no empty passwords or email
		if (email.length == 0 || password.length == 0) {
			return false;
		}

		this.props.auth.signup(email, password);
	};

	login = event => {
		event.preventDefault();
		const { email, password } = this.state;

		// no empty email or password
		if (email.length == 0 || password.length == 0) {
			return false;
		}

		this.props.auth.login(email, password);
	};

	render() {
		const onLogin = this.props.location.pathname == "/login";
		return (
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={Yup.object({
					email: Yup.string()
						.trim()
						.email('Invalid email address')
						.required('Required')
						.max(254, 'Email must not be over 254 characters long'),
					password: Yup.string()
						.trim()
						.required('Required')
						.max(99, 'Password must not be over 99 chararacters long')
				})}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					const authentication = onLogin ? this.props.auth.login.bind(this) : this.props.auth.signup.bind(this);
					const { email, password } = values;
					authentication(email, password);
				}}
			>
				{({ values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting }) => (
						<div className={classes.AuthForm}>
							<Form>
								<FormGroup>
									<FormLabel htmlFor="form-email">Email address</FormLabel>
									<FormControl
										id="form-email"
										name="email"
										type="email"
										placeholder="Enter email"
										className={touched.email && errors.email ? "error" : null}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										required
									></FormControl>
									{
										touched.email && errors.email ? (
											<div className={classes["error-message"]}>{errors.email}</div>
										) : null
									}
								</FormGroup>
								<br />
								<FormGroup>
									<FormLabel htmlFor="form-password">Password</FormLabel>
									<FormControl
										id="form-password"
										name="password"
										type="password"
										placeholder="Enter password"
										className={touched.password && errors.password ? "error" : null}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										required
									></FormControl>
									{
										touched.password && errors.password ? (
											<div className={classes["error-message"]}>{errors.password}</div>
										) : null
									}
								</FormGroup>
								<br />
								<Button type="submit" disabled={isSubmitting} onClick={handleSubmit} style={{
									backgroundColor: '#207ea2',
									borderColor: '#187fa7'
								}}>
									{onLogin ? 'Log In' : 'Sign Up'}
								</Button>
							</Form>
						</div>
					)
				}
			</Formik>
		)
	}
}

export default AuthForm;
