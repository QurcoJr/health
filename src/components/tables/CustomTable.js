import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import { connect } from 'react-redux';

import MaterialTable from 'material-table';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const success = green['A700'];
const danger = red[500];

const CustomTable = ({
  currentUser,
  title,
  columns,
  data,
  setState,
  filtering,
  type,
}) => {
  const { meal, weight, calories, id } = currentUser;

  const mapData = (data) => {
    return { [type]: addColor(data), id };
  };

  const updateLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem('data')) || [];
    const index = localData.findIndex((el) => el.id === id);

    index === -1 ? localData.push(data) : (localData[index][type] = data[type]);
    localStorage.setItem('data', JSON.stringify(localData));
  };

  const addColor = (data) => {
    let mappedData = data;
    switch (type) {
      case 'weights':
        mappedData = data.map((row) =>
          row.weight <= parseFloat(weight)
            ? {
                ...row,
                color: success,
                date: moment(row.date).format('YYYY-MM-DD'),
              }
            : {
                ...row,
                color: danger,
                date: moment(row.date).format('YYYY-MM-DD'),
              }
        );
        break;
      case 'meals':
        {
          let coloredData = [];
          let newData = data.map((obj) => ({
            ...obj,
            date: moment(obj.date).format('YYYY-MM-DD'),
          }));
          let groups = _.groupBy(newData, 'date');

          for (let key in groups) {
            let cal = groups[key].reduce(
              (acc, obj) => (acc += obj.calories),
              0
            );
            if (cal <= meal) {
              groups[key].forEach((el) => {
                el.color = success;
                coloredData.push(el);
              });
            } else {
              groups[key].forEach((el) => {
                el.color = danger;
                coloredData.push(el);
              });
            }
          }
          mappedData = coloredData;
        }
        break;
      case 'activities':
        {
          let coloredData = [];
          let newData = data.map((obj) => ({
            ...obj,
            date: moment(obj.date).format('YYYY-MM-DD'),
          }));
          let groups = _.groupBy(newData, 'date');

          for (let key in groups) {
            let dailyCal = groups[key].reduce((acc, el) => {
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
            if (dailyCal >= calories) {
              groups[key].forEach((el) => {
                el.color = success;
                coloredData.push(el);
              });
            } else {
              groups[key].forEach((el) => {
                el.color = danger;
                coloredData.push(el);
              });
            }
          }
          mappedData = coloredData;
        }
        break;
      default:
        console.log('default');
    }
    return mappedData;
  };

  return (
    <MaterialTable
      options={{
        search: false,
        addRowPosition: 'first',
        pageSizeOptions: [],
        draggable: false,
        filtering,
        rowStyle: (rowData) => {
          return { color: rowData.color };
        },
      }}
      title={title}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                let data = [...prevState.data];
                data.push(newData);

                const mappedData = mapData(data);
                updateLocalData(mappedData);
                data = mappedData[type];

                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  let data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;

                  const mappedData = mapData(data);
                  updateLocalData(mappedData);
                  data = mappedData[type];

                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                let data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);

                const mappedData = mapData(data);
                updateLocalData(mappedData);
                data = mappedData[type];

                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

const mapStateToProps = ({ users, currentUser }) => {
  return { users, currentUser };
};

export default connect(mapStateToProps, null)(CustomTable);
