function getPDCContent() {
  return {
    hero: {
      headline: "Architecting The Future of Business",
      subheadline:
        "Partnering with visionary leaders to navigate complexity, drive sustainable growth, and redefine industry standards in the Middle East and beyond.",
      cta: "Explore Our Solutions",
      image: "/background.png" // ✅ local image from public folder
    },
    services: [
      {
        title: "Strategic Transformation",
        description:
          "Reimagining business models to unlock new value streams and ensure long-term resilience."
      },
      {
        title: "Investment Advisory",
        description:
          "Data-driven financial structuring and risk management to maximize capital efficiency."
      },
      {
        title: "Digital Ecosystems",
        description:
          "Leveraging AI and automation to streamline operations and enhance customer experiences."
      }
    ]
  };
}

module.exports = { getPDCContent };
