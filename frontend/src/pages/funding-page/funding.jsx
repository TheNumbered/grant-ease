import { Grid, Typography } from "@mui/material";
import { getQuery } from "dataprovider";
import { useEffect, useState } from "react";
import { LoadingPage } from "../loading-page";
import ApplyModal from "./apply-modal";

const FundingPage = () => {
  const { data, isError, isLoading } = getQuery("funding-opportunities");
  const [openModal, setOpenModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null); // New state to track selected fund
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Update filtered data whenever data or searchQuery changes
  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((fund) =>
          fund.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [data, searchQuery]);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <section className="HeroSection">
        <h1>Find Your Funding Here!</h1>
        <p>Explore a World of Opportunities to Fuel Your Vision</p>
        <section className="BigSearchSection">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="search"
              name="find-funding"
              id="find-funding"
              placeholder="What Are You Looking For?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                fontSize: "1rem",
              }}
            />
            <button type="submit">Search</button>
          </form>
        </section>
      </section>

      <Grid
        component={"section"}
        container
        spacing={2}
        style={{ marginTop: "1rem" }}
      >
        {filteredData.map((fund) => (
          <Grid item key={fund.id} xs={12} sm={6} md={4}>
            <article className="card">
              {fund.image && (
                <img
                  src={import.meta.env.VITE_API_URL + "/" + fund.image}
                  alt="fund-image"
                  height={200}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <section className="card-header">
                <img src="./favicon-32x32.png" alt="funder-icon" />
                <p className="closing-date">
                  {new Date(fund.deadline).toDateString()}
                </p>
              </section>
              <section className="card-main">
                <Typography variant="h6">{fund.title}</Typography>
                <Typography variant="body1">{`Amount: R ${parseFloat(
                  fund.amount
                ).toFixed(2)}`}</Typography>
                <Typography variant="body2">{fund.description}</Typography>
              </section>
              <section className="card-footer">
                {fund.is_manager === 1 ? (
                  <button className="btn-disabled" disabled>
                    You are the manager
                  </button>
                ) : fund.application_status === "pending" ? (
                  <button className="btn-disabled" disabled>
                    Application Pending
                  </button>
                ) : fund.application_status === "approved" ? (
                  <button className="btn-disabled" disabled>
                    Application Approved
                  </button>
                ) : fund.application_status === "rejected" ? (
                  <button className="btn-disabled" disabled>
                    Application Rejected
                  </button>
                ) : (
                  <input
                    className="btn"
                    type="submit"
                    value="Apply"
                    onClick={() => {
                      setSelectedFund(fund); // Set the selected fund
                      setOpenModal(true); // Open the modal
                    }}
                  />
                )}
              </section>
            </article>
          </Grid>
        ))}
      </Grid>

      {selectedFund && (
        <ApplyModal
          open={openModal}
          fund={selectedFund}
          onClose={() => {
            setOpenModal(false);
            setSelectedFund(null); // Clear the selected fund on close
          }}
        />
      )}
    </>
  );
};

export default FundingPage;
