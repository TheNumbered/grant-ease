import { Grid } from "@mui/material";
import { useState } from "react";
import { getQuery } from "../../dataprovider";
import { LoadingPage } from "../loading-page";
import ApplyModal from "./apply-modal";

const FundingPage = () => {
  const { data, isError, isLoading } = getQuery("funding-opportunities");
  const [openModal, setOpenModal] = useState(false);
  
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (    
    <>
      <section className="HeroSection">
        <h1 style={{ marginTop: "0" }}>Find Your Funding Here!</h1>
        <section className="BigSearchSection">
          <form action="" method="post">
            <input
              type="search"
              name="find-funding"
              id="find-funding"
              placeholder="Company or keyword"
            />
            <button type="submit">Search</button>
          </form>
        </section>
      </section>
      
      <Grid
        component={"section"}
        container
        spacing={3}
        style={{ marginTop: "1rem" }}
      >
        {data.map((fund) => (
          <Grid item key={fund.id} xs={12} sm={6} md={4}>
            <article className="card">
              {fund.image && (
                <img
                  src={import.meta.env.VITE_API_URL + "/" + fund.image}
                  alt="fund-image"
                  height={200}
                />
              )}
              <section className="card-header">
                <img src="./favicon-32x32.png" alt="funder-icon" />
                <p className="closing-date">
                  {new Date(fund.deadline).toDateString()}
                </p>
              </section>
              <section className="card-main">
                <h2>{fund.title}</h2>
                <p>{`Amount: $${parseFloat(fund.amount).toFixed(2)}`}</p>
                <p>{fund.description}</p>
              </section>
              <section className="card-footer">
                {fund.application_status === "pending" ? (
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
                    onClick={() => setOpenModal(true)}
                  />
                )}
              </section>
            </article>
            <ApplyModal open={openModal} onClose={()=>setOpenModal(false)} fund={fund}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FundingPage;
