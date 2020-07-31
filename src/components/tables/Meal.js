import React, { useState } from 'react';

import CustomTable from './CustomTable';

const Meal = ({ getPropperData }) => {
  const [meal, setMeal] = useState({
    columns: [
      { title: 'Date', field: 'date', type: 'date' },
      { title: 'Name', field: 'name' },
      { title: 'Calories', field: 'calories', type: 'numeric' },
    ],
    data: getPropperData('meals'),
  });

  return (
    <CustomTable
      title='Meal'
      type='meals'
      columns={meal.columns}
      data={meal.data}
      setState={setMeal}
    />
  );
};

export default Meal;
