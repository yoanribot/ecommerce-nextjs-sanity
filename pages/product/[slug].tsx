import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "lib/sanity-client";
import { Product } from "../../components";
import { Product as TProduct } from "types-definition/types";
import { useAppContext } from "../../context/AppContext";

interface Props {
  product: TProduct;
  products: TProduct[];
}

const ProductDetails = ({ product, products }: Props) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, currentQty, setShowCart, onAddProduct } =
    useAppContext();

  const handleBuyNow = () => {
    onAddProduct(product, currentQty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index]).toString()}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item).toString()}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{currentQty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAddProduct(product, currentQty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate all possible static paths on compilation time
export const getStaticPaths = async () => {
  const queryProductsSlug = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products: TProduct[] = await client.fetch(queryProductsSlug);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

interface StaticProps {
  params: {
    slug: string;
  };
}

// Get Props from the static path
export const getStaticProps = async ({ params: { slug } }: StaticProps) => {
  const queryCurrentProduct = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const queryAllProducts = '*[_type == "product"]';

  const product = await client.fetch(queryCurrentProduct);
  const products = await client.fetch(queryAllProducts);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
