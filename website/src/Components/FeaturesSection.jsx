

const features = [
  {
    icon: "📦",
    title: "PROFITABLE PLANS",
    description: "Our investment plans are best to generate maximum profits with minimum investment.",
    buttonColor: "#f7a200",
  },
  {
    icon: "📈",
    title: "FAST WITHDRAWAL",
    description: "Our all payment type is Instant at any time.",
    buttonColor: "#1c2b52",
  },
  {
    icon: "🔒",
    title: "ADVANCED SECURITY",
    description: "We have secured by SiteLock and anti DDoS protection by Cloudflare. So our online service will be available 24/7.",
    buttonColor: "#f7a200",
  },
  {
    icon: "📊",
    title: "SUPPORT SERVICE",
    description: "Customer support service is available 24/7 and our support team always ready to help you.",
    buttonColor: "#1c2b52",
  },
];

const FeaturesSection = () => {
  return (
    <section style={{ background: "#fff", padding: "60px 20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: "1100px", margin: "auto" }}>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "50px" }}>
          Through our unique combination of expertise, research and global reach, we work tirelessly to anticipate and advance what’s next — applying collective insights to help keep our clients at the forefront of change.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" }}>
          {features.map((item, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 220px",
                maxWidth: "250px",
                backgroundColor: "#bebcd1",
                borderRadius: "100px",
                padding: "30px 20px",
                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "20px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#444", marginBottom: "20px" }}>{item.description}</p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
