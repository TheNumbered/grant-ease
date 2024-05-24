import { Column } from '@ant-design/plots';
import { getQuery } from 'dataprovider';
import * as React from 'react';

export function ApprovedApplicantsBar() {
  const { data, isLoading, isError } = getQuery('manager/approved-applicants');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const config = {
    data,
    xField: 'title',
    yField: 'approved_applicants',
    meta: {
      title: { alias: 'Funding Opportunities' },
      approved_applicants: { alias: 'No. people funded' },
    },
    animate: { enter: { type: 'growInX' } },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: true,
      },
    },
    style: {
      fill: '#3da08e',
    },
    forceFit: true,
    height: 400,
  };

  return (
    <>
      <h2  style={{fontSize: "2rem"}}>People funded</h2>

      <Column {...config}/>
    </>
  );
}
