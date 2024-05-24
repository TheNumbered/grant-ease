import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import * as React from 'react';
import { getQuery } from '../../../../dataprovider';

export function Basic() {
  const {data, isLoading, isError}= getQuery('manager/funding-balance');

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const fundingAmounts = data.map((item) => parseFloat(item.balance));
  const managers = data.map((item) => item.names);

  return (
    <LineChart
      width={600}
      height={400}
      series={[{ data: fundingAmounts, label: 'Funding Amount', area: true, showMark: false }]}
      xAxis={[{ scaleType: 'point', data: managers, label: 'Managers' }]}
      yAxis={[{ label: 'Funding Amount', labelProps: { angle: -90, position: 'left', textAlign: 'center' } }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: 'none',
        },
      }}
    />
  );
}
