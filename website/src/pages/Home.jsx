import React, { useEffect, useState } from "react"; // ✅ useState & useEffect import karo
import About from "./About";
import FeaturesSection from "../Components/FeaturesSection";
import Fr from './../assets/fr.jpg';
import LandingPage from "../Components/Landingpage";
import Footer from "../Components/Footer";




const Home = () => {
  // ✅ useState aur useEffect ko component ke andar correctly define karo
  const [data, setData] = useState(
    Array(10).fill({ address: '', amount: '', link: '#' })
  );

  useEffect(() => {
    const blockchain = new WebSocket('wss://ws.blockchain.info/inv');

    blockchain.onopen = () => {
      blockchain.send(JSON.stringify({ op: 'unconfirmed_sub' }));
    };

    blockchain.onmessage = (message) => {
      const response = JSON.parse(message.data);
      let amount = 0;

      if (response.op === 'utx') {
        for (let i = 0; i < response.x.out.length; i++) {
          amount += response.x.out[i].value;
        }

        amount = amount / 100000000;

        const newEntry = {
          address: response.x.out[1]?.addr || 'Unknown',
          amount: amount.toFixed(8),
          link: `https://blockchain.info/tx/${response.x.hash}`,
        };

        setData(prev => [newEntry, ...prev.slice(0, 9)]);
      }
    };

    return () => blockchain.close(); // ✅ Clean up WebSocket on unmount
  }, []);

  return (
    <>
      <section className="home">
        <div className="home-content">
          <h1><b>Welcome to USA-Traders</b></h1>
          <p><b>Secure and Fast Crypto Payment Solutions</b></p>
          <button className="get-started">Get Plan</button>
        </div>
      </section>

      <section>
        <About />
      </section>

      <section>
        <FeaturesSection />
      </section>

      <section className="custom-packaging-section">
        <div className="content-container">
          <div className="text-section">
            <h2>
              <span className="highlight">IT'S AMAZING</span> FINANCIAL PLACE<br />
              TO GROW YOUR INCOME
            </h2>
            <p className="sub-heading">
              We are professionally engaged in finances and trading, and have extensive experience in the investment industry.
            </p>
            <p className="description">
              USA-Traders is a trusted investment platform, built under the leadership of a highly skilled team of financial experts and professional traders. We specialize in delivering high-yield private online investment opportunities.
              <br />
              Our diverse client base includes financial institutions, individual investors, and corporate entities. At USA-Traders, we are dedicated to providing top-tier service and helping our clients generate stable, long-term income.
            </p>
          </div>
          <div className="image-section">
            <img src={Fr} alt="Custom Packaging Solutions" />
          </div>
        </div>
      </section>

      <section>
        <div className="content">
          <h2 className="text-center text-3xl font-bold mb-4">
            <span className="text-white">Come in & Out </span>
            <span className="text-orange-500">Transaction</span>
          </h2>

          {data.map((item, i) => (
            <div key={i}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <div className="address">{item.address}</div>
              </a>
              <div className="btc">{item.amount} BTC</div>
              {i < data.length - 1 && <hr />}
            </div>
          ))}

          <div style={{ position: 'relative', textAlign: 'right', top: '-15px', fontSize: 'x-small' }}>
            <a href="https://coingi.com/" style={{ color: '#4ddaed' }}>bitcoin exchange</a>
          </div>
        </div>
      </section>

      <section>
        <LandingPage />
      </section>


      <section>
        <Footer/>
      </section>



    </>
  );
};

export default Home;
