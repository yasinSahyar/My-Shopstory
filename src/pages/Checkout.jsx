import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <a href="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    const [formData, setFormData] = useState({
      firstName: user?.full_name.split(" ")[0] || "",
      lastName: user?.full_name.split(" ")[1] || "",
      email: user?.email || "",
      address: "",
      address2: "",
      country: "",
      state: "",
      zip: "",
      ccName: "",
      ccNumber: "",
      ccExpiration: "",
      ccCvv: "",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Ödeme işlemini simüle etmek için toplam tutar ve adres bilgilerini alalım
      const subtotal = state.reduce((acc, item) => acc + item.price * item.qty, 0);
      const shipping = 30.0;
      const totalAmount = subtotal + shipping;
      const shippingAddress = `${formData.address}, ${formData.state}, ${formData.country}, ${formData.zip}`;

      // ThankYou sayfasına yönlendirme
      navigate("/thankyou", {
        state: {
          totalAmount,
          shippingAddress,
        },
      });
    };

    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });
    state.map((item) => {
      return (totalItems += item.qty);
    });

    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>
                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>
                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping updates.
                        </div>
                      </div>
                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>
                      <div className="col-12 my-1">
                        <label htmlFor="address2" className="form-label">
                          Address 2 (Optional)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          value={formData.address2}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <select
                          className="form-select"
                          id="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose...</option>
                          <option>Finland</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>
                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <select
                          className="form-select"
                          id="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose...</option>
                          <option>Helsinki</option>
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>
                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h4 className="mb-3">Payment</h4>
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="ccName" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ccName"
                          value={formData.ccName}
                          onChange={handleChange}
                          required
                        />
                        <small className="text-muted">Full name as displayed on card</small>
                        <div className="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="ccNumber" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ccNumber"
                          value={formData.ccNumber}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="ccExpiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ccExpiration"
                          value={formData.ccExpiration}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="ccCvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ccCvv"
                          value={formData.ccCvv}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <button className="w-100 btn btn-primary btn-lg" type="submit">
                      Go to pay
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping<span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div><strong>Total amount</strong></div>
                      <span><strong>${Math.round(subtotal + shipping)}</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;