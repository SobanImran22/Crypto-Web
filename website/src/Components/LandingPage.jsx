import React from "react";
//import "./LandingPage.css";
import Trend from './../assets/abcd.png'

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="content-section">
        <h1>
          Doing <span className="highlight">Business</span>, with you to achieve your financial goals!
        </h1>
        <p>
          This is halal-traders.com.com where you can find the best conditions on the world
          investment market. We manage your Investment to deliver maximum benefits to you.
        </p>

        <div className="features">
          <div className="feature-item">
            <span className="icon">📊</span>
            <div>
              <h3>Multiple Plans</h3>
              <p>
                We provide multiple investment plans for our investors. User can use daily and after plan for investment.
              </p>
            </div>
          </div>

          <div className="feature-item">
            <span className="icon">✈️</span>
            <div>
              <h3>Global presence</h3>
              <p>
                We accept investments from anywhere in the world. User can use our service from any country.
              </p>
            </div>
          </div>

          <div className="feature-item">
            <span className="icon">⭐</span>
            <div>
              <h3>Advanced technology</h3>
              <p>
                Using the developments and management of investments the advanced and unique technologies is the base for the new horizons of profit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        {/* Placeholder for chart image */}
        <img
          src={Trend}
          alt="Chart"
          className="chart-img"
        />
      </div>
    </div>
  );
};

export default LandingPage;
