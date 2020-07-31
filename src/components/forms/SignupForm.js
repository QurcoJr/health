import React, { useState } from 'react';
import { Link as routeLink, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { signup } from '../../actions';

import uniqid from 'uniqid';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = ({ users, signup }) => {
  const classes = useStyles();
  let history = useHistory();

  const [emailError, setEmailError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const [userState, setUserState] = useState({
    fname: '',
    email: '',
    password: '',
    weight: '',
    meal: '',
    calories: '',
  });

  const handleInputChange = (event) => {
    setEmailError(false);
    setHelperText('');

    const { name, value } = event.target;
    const oldUser = { ...userState };
    setUserState({
      ...oldUser,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let signupFail = false;

    const oldUsers = [...users];
    for (let i = 0; i < oldUsers.length; i++) {
      if (userState.email === oldUsers[i].email) {
        signupFail = true;
        setEmailError(true);
        setHelperText('Email is already taken.');
        break;
      }
    }

    for (const field in userState) {
      if (userState[field].length === 0) {
        signupFail = true;
      }
    }

    if (!signupFail) {
      const user = { ...userState, id: uniqid() };
      const newUsers = [...oldUsers, user];
      signup(newUsers, user);
      history.push('/');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} validate='true'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={userState.fname}
                name='fname'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Name'
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={userState.email}
                error={emailError}
                helperText={helperText}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={userState.password}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={userState.weight}
                variant='outlined'
                required
                fullWidth
                id='weight'
                label='Desired Weight'
                name='weight'
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={userState.meal}
                variant='outlined'
                required
                fullWidth
                id='meal'
                label='Desired Meal Calories Per Day'
                name='meal'
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                value={userState.calories}
                variant='outlined'
                required
                fullWidth
                id='calories'
                label='Desired Activity Calories Per Day'
                name='calories'
                size='small'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item style={{ marginBottom: '10px' }}>
              <Link component={routeLink} to='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps, { signup })(SignupForm);
