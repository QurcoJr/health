import React, { useState } from 'react';

import CustomTable from './CustomTable';

const Activity = ({ getPropperData }) => {
  const [activity, setActivity] = useState({
    columns: [
      { title: 'Date', field: 'date', type: 'date', filtering: false },
      {
        title: 'Activity Type',
        field: 'actType',
        lookup: { hiking: 'Hiking', running: 'Running', swimming: 'Swimming' },
      },
      {
        title: 'Distance (km)',
        field: 'distance',
        type: 'numeric',
        filtering: false,
      },
    ],
    data: getPropperData('activities'),
  });

  return (
    <CustomTable
      filtering={true}
      title='Activity'
      type='activities'
      columns={activity.columns}
      data={activity.data}
      setState={setActivity}
    />
  );
};

export default Activity;
