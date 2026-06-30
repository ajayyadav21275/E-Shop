import React from "react";

function HeroBanner() {
  return (

    <div className="container mt-4">

      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >

        

        <div className="carousel-indicators">

          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>

          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
          ></button>

          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
          ></button>

          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="3"
          ></button>

        </div>

        {/* SLIDES */}

        <div
          className="carousel-inner rounded-4 shadow-lg"
          style={{
            overflow: "hidden"
          }}
        >

          {/* SLIDE 1 */}

          <div className="carousel-item active">

            <div
              className="row align-items-center bg-light"
              style={{
                minHeight: "300px"
              }}
            >

              <div className="col-lg-6 p-5">

                <span className="badge bg-primary mb-3 p-2">
                  New Collection
                </span>

                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "4rem"
                  }}
                >
                  Big Summer Sale
                </h1>

                <h2 className="mb-4">
                  Up To
                  <span className="text-primary fw-bold">
                    {" "}50% OFF
                  </span>
                </h2>

                <p className="text-secondary fs-5 mb-4">
                  Shop latest products at best prices.
                </p>

                <button className="btn btn-primary btn-lg px-4">
                  Shop Now →
                </button>

              </div>

              <div className="col-lg-6 text-center">

                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  alt="Shoes"
                  className="img-fluid"
                  style={{
                    maxHeight: "450px",
                    objectFit: "contain"
                  }}
                />

              </div>

            </div>

          </div>

          {/* SLIDE 2 */}

          <div className="carousel-item">

            <div
              className="row align-items-center bg-light"
              style={{
                minHeight: "300px"
              }}
            >

              <div className="col-lg-6 p-5">

                <span className="badge bg-dark mb-3 p-2">
                  Trending
                </span>

                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "4rem"
                  }}
                >
                  Fashion Deals
                </h1>

                <h2 className="mb-4">
                  Latest Collection
                </h2>

                <p className="text-secondary fs-5 mb-4">
                  Discover premium fashion products.
                </p>

                <button className="btn btn-dark btn-lg px-4">
                  Explore →
                </button>

              </div>

              <div className="col-lg-6 text-center">

                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                  alt="Fashion"
                  className="img-fluid"
                  style={{
                    maxHeight: "450px",
                    objectFit: "contain"
                  }}
                />

              </div>

            </div>

          </div>

          {/* SLIDE 3 */}

          <div className="carousel-item">

            <div
              className="row align-items-center bg-light"
              style={{
                minHeight: "500px"
              }}
            >

              <div className="col-lg-6 p-5">

                <span className="badge bg-success mb-3 p-2">
                  Electronics
                </span>

                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "4rem"
                  }}
                >
                  Smart Gadgets
                </h1>

                <h2 className="mb-4">
                  Best Tech Products
                </h2>

                <p className="text-secondary fs-5 mb-4">
                  Upgrade your lifestyle with smart gadgets.
                </p>

                <button className="btn btn-success btn-lg px-4">
                  Buy Now →
                </button>

              </div>

              <div className="col-lg-6 text-center">

                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                  alt="Electronics"
                  className="img-fluid"
                  style={{
                    maxHeight: "450px",
                    objectFit: "contain"
                  }}
                />

              </div>

            </div>

          </div>

          {/* SLIDE 4 */}

          <div className="carousel-item">

            <div
              className="row align-items-center bg-light"
              style={{
                minHeight: "500px"
              }}
            >

              <div className="col-lg-6 p-5">

                <span className="badge bg-warning text-dark mb-3 p-2">
                  Limited Offer
                </span>

                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "4rem"
                  }}
                >
                  Premium Watches
                </h1>

                <h2 className="mb-4">
                  Luxury Collection
                </h2>

                <p className="text-secondary fs-5 mb-4">
                  Elegant watches for every occasion.
                </p>

                <button className="btn btn-warning btn-lg px-4">
                  View More →
                </button>

              </div>

              <div className="col-lg-6 text-center">

                <img
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49"
                  alt="Watch"
                  className="img-fluid"
                  style={{
                    maxHeight: "450px",
                    objectFit: "contain"
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* PREV BUTTON */}

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >

          <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>

        </button>

        {/* NEXT BUTTON */}

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >

          <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>

        </button>

      </div>

    </div>

  );
}

export default HeroBanner;