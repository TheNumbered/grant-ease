import { StatusChangeTable } from "../../../components/status-change-table";
import {
  getQuery,
  createMutation as updateManyMutation,
} from "../../../dataprovider";

// Change data to match the table headers
function transformData(data) {
  return data.map((item) => {
    const transformedItem = {};
    Object.keys(item).forEach((key) => {
      if (key === "status") {
        transformedItem["Status"] = item[key];
      } else if (key === "full_name") {
        transformedItem["Full Name"] = item[key];
      } else {
        transformedItem[key] = item[key];
      }
    });
    return transformedItem;
  });
}

export default function ManageApplications({ fundId }) {
  const { data: result, isLoading, isError } = getQuery("manager/applications");
  const { mutate: updateIds } = updateManyMutation({
    resource: "manager/update-applications",
    invalidateKeys: ["manager/applications"],
  });
  const {
    data: amount,
    isLoading: amountIsLoading,
    isError: amountIsError,
  } = getQuery("manager/fund-ad-amount");

  const {
    mutate: updateBalance,
    data: returned_data,
    isLoading: updateBalanceLoading,
  } = updateManyMutation({
    resource: "manager/deduct-balance",
  });

  const handleStatusChange = (selected, status) => {
    const newStatus = status === "approve" ? "Approved" : "Rejected";
    const target = amount.find((item) => item.id === fundId);
    const target_amount = target.amount * selected.length;
    updateBalance({
      amount: target_amount,
    });

    console.log(returned_data);

    if (returned_data.message === "Balance deducted successfully") {
      updateIds({ ids: selected, newStatus });
      console.log("good!");
    } else {
      alert("Insufficient balance");
    }
  };
  let data = result ?? [];
  data = transformData(data);

  function filterByFundId(data, fundId) {
    return data.filter((item) => item.fund_id === fundId);
  }
  data = filterByFundId(data, fundId);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <StatusChangeTable
        title="Manage Applications"
        data={data}
        headers={["Full Name", "Status"]}
        handleStatusChange={handleStatusChange}
      />
    </>
  );
}
