import React from "react";
import Newscard from "../Newscard";
import "./Home.css";
function Home() {
  return (
    <span className="home-wrapper">
      <section className="home-container">
        <div className="home-contents">
          <h1 className="home-title">TREE</h1>
          <p className="home-desc">
            A platform created to reduce carbon emission via decentralized
            autonomous forest preservation. Buy your token today and help save
            the Earth!
          </p>
          <ul className="newscard-container">
            <Newscard
              event="DeepOwl Woods tokens now available!"
              duration="24th April 2022-31st May 2022"
              className="newscard-items"
            ></Newscard>
            <Newscard
              event="Governance voting starting soon!"
              duration="26th April 2022-28th April 2022"
              className="newscard-items"
            ></Newscard>
          </ul>
          <div className="all-buttons">
            <btn className="button-design2">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              <span className="button-desc">Important Dates</span>
            </btn>
            <btn className="button-design2">
              <i class="fas fa-image"></i>
              <span className="button-desc">More Photos</span>
            </btn>
          </div>
        </div>
      </section>
    </span>
  );
}

export default Home;
