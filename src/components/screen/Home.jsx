import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Food from "./Food";
import burger from "./burger.png";
import pizza from "./pizza.png";
import fries from "./fries.png";

function Home() {
  const [search, setsearch] = useState("");

  const handleonchange = (event) => {
    setsearch(event.target.value);
  };

  const [fooddata, setfooddata] = useState([]);
  const [foodCat, setfoodCat] = useState([]);
  const loaddata = async () => {
    let response = await fetch("http://localhost:1000/app/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfooddata(response[0]);
    setfoodCat(response[1]);
  };
  useEffect(() => {
    loaddata();
  }, []);
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active slide">
              <img src={burger} className="d-block w-100 h-100" alt="..." />
              <div
                className="carousel-caption d-none d-md-block"
                style={{ position: "absolute", top: "10px", zIndex: "10" }}
              >
                <div className="form-flex d-flex" style={{ gap: "10px" }}>
                  <input
                    className="form-control mr-sm-2"
                    style={{ zIndex: "10" }}
                    type="search"
                    onChange={handleonchange}
                    value={search}
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item slide">
              <img src={pizza} className="d-block w-100 h-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item slide">
              <img src={fries} className="d-block w-100 h-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== null ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooddata !== null ? (
                  fooddata
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filteritems) => {
                      return (
                        <div
                          key={filteritems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Food
                            fooditems={filteritems}
                            options={filteritems.options[0]}
                          ></Food>
                        </div>
                      );
                    })
                ) : (
                  <div></div>
                )}
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
