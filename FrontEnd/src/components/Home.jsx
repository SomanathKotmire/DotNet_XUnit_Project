import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [menuCount, setMenuCount] = useState(0);
  const [dishCount, setDishCount] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASEURL + "dishes")
      .then((res) => {
        setDishCount(res.data.length);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASEURL + "menus")
      .then((res) => {
        setMenuCount(res.data.length);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  return (
    <div className="container mt-5">
    <div className="text-center mb-5">
      <h1 className="fw-bold">🍽️ Restaurant Menu Manager 🍴</h1>
    </div>
    <div className="row g-4">
      <div className="col-md-6 d-flex">
        <div
          className="card text-center border-0 shadow-sm flex-fill"
          style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "white",
            minHeight: "250px",
          }}
        >
          <div className="card-body d-flex flex-column justify-content-center">
            <i
              className="bi bi-journal-richtext mb-3"
              style={{ fontSize: "3rem" }}
            ></i>
            <h4 className="fw-bold">Total Menus</h4>
            <h1 className="fw-bold display-4">{menuCount}</h1>
          </div>
        </div>
      </div>
  
      <div className="col-md-6 d-flex">
        <div
          className="card text-center border-0 shadow-sm flex-fill"
          style={{
            background: "linear-gradient(135deg, #f7971e, #ffd200)",
            color: "white",
            minHeight: "250px",
          }}
        >
          <div className="card-body d-flex flex-column justify-content-center">
            <i
              className="bi bi-egg-fried mb-3"
              style={{ fontSize: "3rem" }}
            ></i>
            <h4 className="fw-bold">Total Dishes</h4>
            <h1 className="fw-bold display-4">{dishCount}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Home;
