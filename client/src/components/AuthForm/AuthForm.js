import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classes from './AuthForm.module.css'
import config from '../../config/index'
const { CLIENT_URL: baseURL } = config

class AuthForm extends Component {
  render() {
    const onLogin = this.props.location.pathname == `${baseURL}/login`
    const route = onLogin ? 'login' : 'signup'
    const authentication = this.props.auth.authenticate(route)
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
            .max(99, 'Password must not be over 99 chararacters long'),
        })}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          const { email, password } = values
          authentication(email, password).catch(err => {
            if (err.status == 400 || err.status == 409) {
              actions.setFieldError(err.data.field, err.data.message)
            }
            actions.setSubmitting(false)
          })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className={classes.AuthForm}>
            <Form>
              <FormGroup>
                <FormLabel htmlFor="form-email">Email address</FormLabel>
                <FormControl
                  id="form-email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className={
                    touched.email && errors.email ? classes['error'] : null
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  required
                ></FormControl>
                {touched.email && errors.email ? (
                  <div className={classes['error-message']}>{errors.email}</div>
                ) : null}
              </FormGroup>
              <br />
              <FormGroup>
                <FormLabel htmlFor="form-password">Password</FormLabel>
                <FormControl
                  id="form-password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className={
                    touched.password && errors.password
                      ? classes['error']
                      : null
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  required
                ></FormControl>
                {touched.password && errors.password ? (
                  <div className={classes['error-message']}>
                    {errors.password}
                  </div>
                ) : null}
              </FormGroup>
              <br />
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#207ea2',
                  borderColor: '#187fa7',
                }}
              >
                {isSubmitting ? 'Loading...' : onLogin ? 'Log In' : 'Sign Up'}
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    )
  }
}

export default AuthForm
