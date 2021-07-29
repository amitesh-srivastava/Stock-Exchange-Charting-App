import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      StockExchangeApp{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
}));




export default function SignIn() {
  const [username, setusername] = useState("");
  const [pass, setPass] = useState("");
  const [count, setCount] = useState(1);

  const classes = useStyles();

  const check = async () => {
    const users = await axios.get("https://amiteshstockexchangebackend.herokuapp.com/userLogin?name=" + username + "&password=" + pass)
    const article = { "username": username, "password": pass }
    var loginBody = "";
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/authenticate', article).then(res => {
      loginBody = res.data;
      sessionStorage.setItem("token", loginBody.token)
    })
    await sessionStorage.setItem("useRole", users.data);
    console.log(sessionStorage.getItem("useRole"))
    window.alert("login sucessfull")
    window.location.href = "https://amiteshstockexchangefrontend.herokuapp.com/Navbar";
  }

  useEffect(() => {
  }, [count]);

  const checkusername = ({ target }) => {
    setusername(target.value);
  };

  const checkPass = ({ target }) => {
    setPass(target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="user"
            autoComplete="user"
            autoFocus
            value={username}
            onChange={checkusername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={checkPass}
          />
          <Button
            onClick={check}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="https://amiteshstockexchangefrontend.herokuapp.com/signUp" variant="body2">
                {"Not a Registered User? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}