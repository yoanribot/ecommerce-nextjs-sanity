import Link from "next/link";
import React from "react";

const HeroBanner = () => {
  return (
    <section className="hero-banner-container">
      <div>
        <p className="beats-solo">Small text</p>
        <h3>Mid text</h3>
        <img src="" className="hereo-banner-image" alt="headphones" />
        <div>
          <Link href={"/product/Id"}>
            <button type="button"> Button text </button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>Description text</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
