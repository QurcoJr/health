import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const success = green['A700'];
const danger = red[500];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
  },
  table: {
    minWidth: 650,
  },
}));

const Dashboard = ({ currentUser }) => {
  const data = JSON.parse(localStorage.getItem('data'));
  const { meal, weight, calories, id } = currentUser;
  const userData = data.find((el) => el.id === id) || [];

  

  const { weights, meals, activities } = userData;
  let dashboardData = [];
  const classes = useStyles();

  const groupData = (data, type) => {
    let groups = _.groupBy(data, 'date');
    for (let key in groups) {
      let found = false;
      let index, daily;
      for (var i = 0; i < dashboardData.length; i++) {
        if (dashboardData[i].date === key) {
          found = true;
          index = i;
          break;
        }
      }
      switch (type) {
        case 'weight':
          daily = groups[key][0].weight;
          break;
        case 'meal':
          daily = groups[key].reduce((acc, obj) => (acc += obj.calories), 0);
          break;
        case 'activity':
          daily = groups[key].reduce((acc, el) => {
            let actCal;
            switch (el.actType) {
              case 'swimming':
                actCal = el.distance * 40;
                break;
              case 'running':
                actCal = el.distance * 140;
                break;
              case 'hiking':
                actCal = el.distance * 300;
                break;
              default:
                actCal = 0;
            }
            return (acc += actCal);
          }, 0);
          break;
        default:
          daily = undefined;
      }
      found
        ? (dashboardData[index][type] = daily)
        : dashboardData.push({ date: key, [type]: daily });
    }
  };

  groupData(meals, 'meal');
  groupData(weights, 'weight');
  groupData(activities, 'activity');
  dashboardData.sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <Container component='main' maxWidth='lg'>
      <div className={classes.paper}>
        <Typography
          component='h1'
          variant='h4'
          style={{ marginBottom: '40px', textAlign: 'center' }}>
          Dashboard
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Meals</TableCell>
                <TableCell>Activities</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell
                    style={
                      row.weight <= weight
                        ? { color: success }
                        : { color: danger }
                    }>
                    {row.weight ? `${row.weight}kg ` : null}
                  </TableCell>
                  <TableCell
                    style={
                      row.meal <= meal ? { color: success } : { color: danger }
                    }>
                    {row.meal ? `${row.meal} calories` : null}
                  </TableCell>
                  <TableCell
                    style={
                      row.activity >= calories
                        ? { color: success }
                        : { color: danger }
                    }>
                    {row.activity ? `${row.activity} calories` : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ currentUser, data }) => {
  return { currentUser, data };
};

export default connect(mapStateToProps, null)(Dashboard);
