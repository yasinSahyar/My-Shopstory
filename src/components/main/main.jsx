
import React from "react";
import "./main.css"; 

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/SeptemberShop-courtesy_gb1yug.png"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title ">New Season Arrivals</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              The goods in our shop change according to the season, we will try to display 
              the newest season here at the beginning of the season.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
