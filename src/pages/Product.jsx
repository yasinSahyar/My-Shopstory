
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { products } from "../components/data/data";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const foundProduct = products.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);

    if (foundProduct) {
      setSimilarProducts(
        products.filter(
          (item) =>
            item.category === foundProduct.category &&
            item.id !== foundProduct.id
        )
      );
    }
  }, [id]);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const ShowProduct = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.image}
              alt={product.title}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead">
              {product.rating?.rate} <i className="fa fa-star"></i>
            </p>
            <h3 className="display-6 my-4">${product.price}</h3>
            <p className="lead">{product.description}</p>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => (
            <div key={item.id} className="card mx-4 text-center">
              <img
                className="card-img-top p-3"
                src={item.image}
                alt="Card"
                height={300}
                width={300}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
              </div>
              <div className="card-body">
                <Link to={"/product/" + item.id} className="btn btn-dark m-1">
                  Buy Now
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => addProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {product ? <ShowProduct /> : <div>Product not found</div>}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also Like</h2>
            <Marquee pauseOnHover pauseOnClick speed={50}>
              <ShowSimilarProduct />
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
