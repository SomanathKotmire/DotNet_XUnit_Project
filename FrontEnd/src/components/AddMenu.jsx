import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMenu = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [data, setData] = useState({
    id: 0,
    title: "",
    
  }); 

  const [error, setError] = useState({
    titleError: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errObj = { titleError: "" };

    if (data.title.trim() === "") {
      errObj.titleError = "Title is required";
    }

    if (errObj.titleError) {
      setError(errObj);
    } else {
      if (id === undefined) {
        axios
          .post(import.meta.env.VITE_BASEURL + "menus/", data)
          .then((res) => {
            console.log(res.data);
            toast.success("Menu added successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            setData({
              title: "",
            });
            setTimeout(() => navigate("/menus"), 1000);
          })
          .catch((ex) => {
            console.log(ex);
            toast.error("Failed to add menu");
          });
      } else {
        axios
          .put(import.meta.env.VITE_BASEURL + "menus/" + id, data)
          .then((res) => {
            console.log(res.data);
            toast.success("Menu updated successfully!");
            setData({
              title: "",
            });
            setTimeout(() => navigate("/menus"), 1000);
          })
          .catch((ex) => {
            console.log(ex);
            toast.error("Failed to update menu")
          });
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      axios.get(import.meta.env.VITE_BASEURL + "menus/" + id).then((res) => {
        console.log(res.data);
        setData({
          id: res.data.id,
          title: res.data.title,
        });
      });
    }
  }, []);

  return (
    <div>
      <ToastContainer hideProgressBar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="pagetitle">
              <h1>Add Menu</h1>
              <div>
                <p
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Home/AddMenu"
                  className="bread fs-6"
                >
                  <span>
                    <a className="text-decoration-none text-muted" href="/Home">
                      Home
                    </a>
                  </span>{" "}
                  / <span>AddMenu</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-end">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-danger mt-3"
            >
              Back
            </button>
          </div>
        </div>

        <div className="card shadow p-0 mt-4">
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-12 col-sm-12 mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Menu Title <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    value={data.title}
                    id="title"
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter menu title"
                    required
                  />

                  
                  {error.titleError && (
                    <span className="text-danger">{error.titleError}</span>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className="btn btn-success me-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setData({ title: "" })}
                    type="reset"
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
