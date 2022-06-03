export type Product = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: string[];
  price: number;
  details: string;
};

export type BannerData = {
  image: string;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
};
