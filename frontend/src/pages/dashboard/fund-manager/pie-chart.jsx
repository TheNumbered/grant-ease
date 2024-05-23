import { PieChart } from '@mui/x-charts/PieChart';
import * as React from 'react';
import { getQuery } from '../../../dataprovider';

const convertData = (data) => {
  return data.map((item) => {
    return {
      value: parseFloat(item.amount),
      label: item.title,
    };
  });
};

const size = {
  width: 600,
  height: 200,
};

export function PieArcLabel() {
  const { data, isLoading, isError } = getQuery('manager/fund-amounts');
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error</div>;
  }
  
  const convertedData = convertData(data);
  
  return (
    <PieChart
      series={[
        {
          data: convertedData,
          cx: 142,
        },
      ]}
      sx={{
        // Optionally, you can still style other aspects of the chart here
      }}
      {...size}
    />
  );
}
