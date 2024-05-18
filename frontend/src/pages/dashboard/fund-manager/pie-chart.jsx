import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
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
  width: 400,
  height: 200,
};

export function PieArcLabel() {
  const {data,isLoading,isError  }  = getQuery('manager/fund-amounts');
  if (isLoading) {
    return <div>Loading...</div>;
  }
if(isError){ 
     return <div>Error</div>;
    }
   const  convertedData = convertData(data);
  
  
  return (
   <> <h2>funding budget</h2>
    <PieChart
      series={[
        {
          arcLabel: (item) => `R${item.value}M`,
          arcLabelMinAngle: 45,
          data: convertedData,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
    </> 
  );
}
