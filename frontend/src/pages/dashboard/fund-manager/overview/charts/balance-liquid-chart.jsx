import { Liquid } from "@ant-design/plots";
import { getQuery } from "dataprovider";
import React from "react";

export const BalanceLiquidChart = () => {
  const { data, isLoading, isError } = getQuery("manager/balance-change");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const totalAmountSpent = parseFloat(data[0].total_amount_spent);
  const currentBalance = parseFloat(data[0].current_balance);
  const percentageRemaining = currentBalance / (totalAmountSpent + currentBalance);

const config = {
    percent: percentageRemaining,
    style: {
        backgroundFill : "#9fd4c3",
        fill: "#3da08e", // Green color
        waveLength: 128
    },
};
  return (
    <>
      <h3>Balance Remaining</h3>

      <Liquid {...config} />
    </>
  );
};
