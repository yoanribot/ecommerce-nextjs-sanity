import type { NextPage } from "next";

import { HeroBanner, FooterBanner } from "components";

const Home: NextPage = () => {
  return (
    <section>
      <HeroBanner />
      <FooterBanner />
    </section>
  );
};

export default Home;
