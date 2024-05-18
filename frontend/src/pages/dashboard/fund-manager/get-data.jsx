import { getQuery } from "../../../dataprovider";
import { FundManagerDashboard } from "./dashboard";

const ManagerBalance = () => {
  const { data, isError, isLoading } = getQuery("manager/balance");

  // Use getQuery to get the number of applicants
  const {
    data: numApplicants,
    isError: errorApplicants,
    isLoading: loadingApplicants,
  } = getQuery("manager/get-num-applicants");

  // Check if both data and numApplicants are defined
  const isDataLoaded =
    !isLoading && !loadingApplicants && data && numApplicants;

  return (
    <>
      {isDataLoaded ? (
        <FundManagerDashboard data={data} applicants={numApplicants} />
      ) : (
        <p>Loading...</p>
      )}
      {(isError || errorApplicants) && <p>Error</p>}
    </>
  );
};
export default ManagerBalance;
