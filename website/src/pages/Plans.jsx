import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";

const plans = [
  {
    title: "STARTER",
    profit: "90% After 24 hours",
    time: "After 24 hours",
    min: "$700",
    percentage: "90%",
    bgColor: "#1f2e57",
    btnColor: "#fcb618",
  },
  {
    title: "ADVANCED",
    profit: "90% After 48 hours",
    time: "After 48 hours",
    min: "$1500",
    percentage: "90%",
    bgColor: "#fcb618",
    btnColor: "#1f2e57",
  },
  {
    title: "BUSINESS",
    profit: "90% After 72 hours",
    time: "After 72 hours",
    min: "$3500",
    percentage: "90%",
    bgColor: "#1f2e57",
    btnColor: "#fcb618",
  },
  {
    title: "BUSINESS PRO",
    profit: "90% After 1 Week",
    time: "1 Week",
    min: "$4000",
    max: "$10,000",
    percentage: "90%",
    bgColor: "#fcb618",
    btnColor: "#1f2e57",
  },
];

const Plans = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(loggedInUser ? JSON.parse(loggedInUser) : null);
  }, []);

  const handleDeposit = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/deposit");
    }
  };

  return (
    <div>
      <div className="plans-section">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <div
              className="plan-header"
              style={{ backgroundColor: plan.bgColor, color: "white" }}
            >
              {plan.title}
            </div>
            <div className="plan-body">
              <h2>{plan.profit}</h2>
              <h3>{plan.time}</h3>
              <p>
                Min: {plan.min}
                {plan.max && ` max: ${plan.max}`}
              </p>
              <p>Principle: Include</p>
              <p>Profit: {plan.percentage}</p>
              <p>Payment type: Instant</p>
            </div>
            <button
              className="deposit-btn"
              style={{ backgroundColor: plan.btnColor }}
              onClick={handleDeposit}
            >
              DEPOSIT NOW
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Plans;
