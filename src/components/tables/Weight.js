import React, { useState } from 'react';

import CustomTable from './CustomTable';

const Weight = ({ getPropperData }) => {
  const [weight, setWeight] = useState({
    columns: [
      { title: 'Date', field: 'date', type: 'date' },
      { title: 'Weight (kg)', field: 'weight', type: 'numeric' },
    ],
    data: getPropperData('weights'),
  });

  return (
    <CustomTable
      title='Weight'
      type='weights'
      columns={weight.columns}
      data={weight.data}
      setState={setWeight}
    />
  );
};

export default Weight;
