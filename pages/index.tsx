import type { NextPage } from "next";

import { client } from "lib/sanity-client";
import { HeroBanner, FooterBanner } from "components";
import { Product, BannerData } from "../types-definition/types";

interface Props {
  products: Product[];
  bannerData: BannerData[];
}

const Home: NextPage<Props> = ({ products, bannerData }) => {
  console.log(products);
  console.log(bannerData);
  return (
    <section>
      {bannerData?.length > 0 && <HeroBanner data={bannerData[0]} />}
      <FooterBanner />
    </section>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
