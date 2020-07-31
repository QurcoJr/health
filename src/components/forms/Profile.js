import React, { useState } from 'react';

import { connect } from 'react-redux';
import { updateUser } from '../../actions';

import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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

const Profile = ({ currentUser, updateUser }) => {
  const classes = useStyles();
  let history = useHistory();

  const { fname, email, password, weight, meal, calories } = currentUser;

  const [userState, setUserState] = useState({
    fname,
    password,
    weight,
    meal,
    calories,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const oldUser = { ...userState };
    setUserState({
      ...oldUser,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ ...userState, email });
    history.push('/');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} validate='true'>
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
                value={email}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                size='small'
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { updateUser })(Profile);
