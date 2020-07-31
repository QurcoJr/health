import React from 'react';
import { connect } from 'react-redux';

import Weight from './tables/Weight';
import Meal from './tables/Meal';
import Activity from './tables/Activity';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import img from '../images/fitness.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
  },
}));

const Home = ({ session, currentUser }) => {
  const classes = useStyles();
  const data = JSON.parse(localStorage.getItem('data'));

  const getPropperData = (type) => {
    const { id } = currentUser;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id && data[i].hasOwnProperty(type)) {
        return data[i][type];
      }
    }
    return [];
  };

  const tables = session ? (
    <>
      <Grid item xs={12} md={6}>
        <Weight getPropperData={getPropperData} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Meal getPropperData={getPropperData} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Activity getPropperData={getPropperData} />
      </Grid>
    </>
  ) : (
    <img src={img} alt='' style={{ maxWidth: '100%' }} />
  );

  return (
    <Container component='main' maxWidth='lg'>
      <div className={classes.paper}>
        <Grid container spacing={2} justify='center'>
          {tables}
        </Grid>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ session, currentUser }) => {
  return { session, currentUser };
};

export default connect(mapStateToProps, null)(Home);
