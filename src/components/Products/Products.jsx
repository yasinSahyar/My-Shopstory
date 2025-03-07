import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";

import { products } from "../data/data";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Products.css"; 

const Products = () => {
  const [data] = useState(products);
  const [filter, setFilter] = useState(products);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="product-buttons">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
        </div>

        {filter.map((product) => (
          <div
            id={product.id}
            key={product.id}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          >
            <div className="product-card">
              <img className="product-img" src={product.image} alt="Card" />
              <div className="card-body">
                <h5 className="product-title">
                  {product.title.substring(0, 12)}...
                </h5>
                <p className="product-desc">
                  {product.description.substring(0, 90)}...
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item product-price">
                € {product.price}
                </li>
              </ul>
              <div className="card-body">
                <Link to={"/product/" + product.id} className="btn btn-dark">
                  Buy Now
                </Link>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    toast.success("Added to cart");
                    addProduct(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="product-container">
      <div className="row">
        <div className="col-12">
          <h2 className="product-heading">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        <ShowProducts />
      </div>
    </div>
  );
};

export default Products;
