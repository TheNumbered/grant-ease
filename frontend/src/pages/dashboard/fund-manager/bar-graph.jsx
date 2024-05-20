import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';
import { getQuery } from '../../../dataprovider';

export function BarAnimation() {
  const { data, isLoading, isError } = getQuery('manager/approved-applicants');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const xAxisData = data.map((item) => item.title);
  const seriesData = data.map((item) => item.approved_applicants);

  return (
    <>
      <h2  style={{fontSize: "2rem"}}>People funded</h2>
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: xAxisData,
            label: 'Funding Opportunities',
          },
        ]}
        yAxis={[
          {
            label: 'No. people funded',
            labelProps: {
              angle: -90,
              position: 'left',
              textAlign: 'center',
            },
          },
        ]}
        series={[{ data: seriesData }]}
        width={500}
        height={300}
      />
    </>
  );
}
