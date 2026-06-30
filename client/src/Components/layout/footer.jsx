import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 px-3 mt-auto">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-4">
            <h3 className="fw-bold">E-Shop</h3>
            <p>
              Best online shopping website for fashion,
              electronics, shoes and more products.
            </p>
          </div>

          
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>

              <li className="mb-2">
                <a href="/product" className="text-white text-decoration-none">
                  Products
                </a>
              </li>

              <li className="mb-2">
                <a href="/cart" className="text-white text-decoration-none">
                  Cart
                </a>
              </li>

              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Categories</h5>

            <ul className="list-unstyled">
              <li className="mb-2">Fashion</li>
              <li className="mb-2">Electronics</li>
              <li className="mb-2">Shoes</li>
              <li className="mb-2">Watches</li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Contact</h5>

            <p>Email: support@eshop.com</p>
            <p>Phone: +91 9610180560</p>
            <p>Delhi, India</p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center">
          <p className="mb-2">
            © 2026 E-Shop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;