import { Pie } from '@ant-design/plots';
import { getQuery } from 'dataprovider';
import * as React from 'react';

const convertData = (data) => {
  return data.map((item) => {
    return {
      value: parseFloat(item.amount),
      label: item.title,
    };
  });
};


export function FundAmountsPie() {
  const { data, isLoading, isError } = getQuery('manager/fund-amounts');
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error</div>;
  }
  
  const convertedData = convertData(data);
  const colorPalette = [
    "#095f59", // Original color
    "#0e837a", // Teal
    "#3da08e", // Light Teal
    "#9fd4c3", // Pale Aqua
    "#f2b807", // Gold
    "#f28f3b", // Orange
    "#f25f5c"  // Coral
  ];
  const config = {
    data: convertedData,
    innerRadius: 0.64,
    angleField: 'value',
    colorField: 'label',
    paddingRight: 80,
    label: {
      text: ({ label, value }) => {
        return "R" + ' ' + value;
      },
      position: 'outside',
    },
    interaction: {
      elementHighlight: true,
    },
    tooltip:{
      title: (d) => d.label
    },
    scale: { color: { palette: colorPalette }},
    legend: {
      color: {
        title: false,
        // position: 'right',
        // rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
}
