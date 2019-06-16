import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignupPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      touched: {
        'username': false,
        'email': false,
        'password': false,
      },
      formValid: false
    }
  }

  touch = (field) => {
    var {touched} = this.state;
    touched[field] = true
    console.log("touched", touched)
    /* this.setState({"touched": touched})*/
  }

  handleClick = () => {
    console.log("handle click", this.state);
    fetch('http://localhost:5000/users/' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((result) => result.json())
      .catch((info) => console.log("register failed. info", info))
  }

  inputUsername = (e) => {
    var {touched} = this.state
    touched['username'] = true
    this.setState({"username": e.target.value, "touched": touched})
  }

  inputEmail = (e) => {
    var {touched} = this.state
    touched['email'] = true
    this.setState({"email": e.target.value, "touched": touched})
  }

  inputPassword = (e) => {
    var {touched} = this.state
    touched['password'] = true
    this.setState({"password": e.target.value, "touched": touched})
  }

  render () {
    const {classes} = this.props;
    const {username, email, password, touched} = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={this.inputUsername}
                  error={touched["username"] && username === ""}
                  helperText={(touched["username"] && username === "") ? 'username is required' : ' '}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={touched["email"] && email === ""}
                  helperText={(touched["email"] && email === "") ? 'email is required' : ' '}
                  onChange={this.inputEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.inputPassword}
                  error={touched["password"] && password === ""}
                  helperText={(touched["password"] && password === "") ? 'password is required' : ' '}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleClick}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(SignupPage);
