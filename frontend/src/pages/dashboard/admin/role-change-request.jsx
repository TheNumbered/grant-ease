import { CircularProgress } from "@mui/material";
import { StatusChangeTable } from "components/status-change-table";
import { getQuery, createMutation as updateManyMutation } from "dataprovider";

// Change data to match the table headers
function transformData(data) {
  return data.map((item) => {
    const transformedItem = {};
    Object.keys(item).forEach((key) => {
      if (key === "role") {
        transformedItem["Role"] = item[key];
      } else if (key === "full_name") {
        transformedItem["Full Name"] = item[key];
      } else {
        transformedItem[key] = item[key];
      }
    });
    return transformedItem;
  });
}

export default function RoleChangeRequest() {
  const { data: result, isLoading, isError } = getQuery("admin/pending-managers");
  const { mutate: updateIds, isLoading: updateLoading } = updateManyMutation({resource:"admin/update-roles",invalidateKeys:["admin/pending-managers"]})
  
  const { mutate: notify } = updateManyMutation({resource: "notify"});
  const handleStatusChange = (selected, status) => {
      const newRole = status === "approve" ? "fund_manager" : "user";
      updateIds({ids: selected, newRole});
      const notifyType = status === "approve" ? "approved fund manager" : "rejected fund manager";
      selected.forEach(id => {
        notify({"target_user_id" : id, type: notifyType});
      });
  };
  let data = result ?? [];
  data = transformData(data);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <StatusChangeTable
        title="Role Change Requests"
        data={data}
        headers={["Full Name", "Role"]}
        handleStatusChange={handleStatusChange}
      />
      {updateLoading && 
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        zIndex: 6,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '100%',
        height: '100%',
       }}>
        <CircularProgress />
      </div>
      }
    </>
  );
}
