import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../../actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({ users, login }) => {
  const classes = useStyles();
  let history = useHistory();

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [userState, setUserState] = useState({ email: '', password: '' });

  const handleInputChange = (event) => {
    setError(false);
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
    let auth = false;
    let currentUser = null;

    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === userState.email &&
        users[i].password === userState.password
      ) {
        auth = true;
        currentUser = users[i];
        break;
      }
    }

    if (auth) {
      // setSession(true);
      // setCurrentUser(currentUser);
      login(currentUser);
      history.push('/');
    } else {
      setError(true);
      setHelperText('Incorrect entry.');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                error={error}
                helperText={helperText}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                error={error}
                helperText={helperText}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(mapStateToProps, { login })(LoginForm);
