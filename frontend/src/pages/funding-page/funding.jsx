import { Grid, Typography } from "@mui/material";
import { getQuery } from "dataprovider";
import { useEffect, useState } from "react";
import { LoadingPage } from "../loading-page";
import ApplyModal from "./apply-modal";
import DescriptionModal from "./description-modal"; // Import the DescriptionModal component

const FundingPage = () => {
  const { data, isError, isLoading } = getQuery("funding-opportunities");
  const [openModal, setOpenModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [fullDescription, setFullDescription] = useState("");

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
                <Typography
                  variant="body2"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    lineHeight: "1.5em",
                  }}
                >
                  {fund.description}
                </Typography>
                {fund.description.length > 100 && (
                  <button
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                      color: "#000",
                    
                    }}
                    onClick={() => {
                      setFullDescription(fund.description);
                      setDescriptionModalOpen(true);
                    }}
                  >
                    Read More
                  </button>
                )}
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
                      setSelectedFund(fund);
                      setOpenModal(true);
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
            setSelectedFund(null);
          }}
        />
      )}

      <DescriptionModal
        open={descriptionModalOpen}
        description={fullDescription}
        onClose={() => setDescriptionModalOpen(false)}
      />
    </>
  );
};

export default FundingPage;
