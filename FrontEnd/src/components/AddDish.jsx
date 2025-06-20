import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDish = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [data, setData] = useState({
    id: 0,
    title: "",
    menuId: 0,
  });

  const [error, setError] = useState({
    titleError: "",
    menuIdError: "",
  });

  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + "menus").then((res) => {
      console.log(res.data);
      setMenuList(res.data);
    });
  }, []);

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errObj = { titleError: "", menuIdError: "" };
    let hasError = false;

    if (data.title.trim() === "") {
      errObj.titleError = "Title is required";
      hasError = true;
    }

    if (data.menuId === 0 || data.menuId === "0") {
      errObj.menuIdError = "Menu is required";
      hasError = true;
    }

    setError(errObj);

    if (hasError) {
      return;
    }

    if (id === undefined) {
      axios.post(import.meta.env.VITE_BASEURL + "dishes/", data).then((res) => {
        console.log(res.data);
        toast.success("Dish added successfully!", {
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
        setTimeout(() => navigate("/dishes"), 1000);
      });
    } else {
      axios
        .put(import.meta.env.VITE_BASEURL + "dishes/" + id, data)
        .then((res) => {
          console.log(res.data);
          toast.success("Dish added successfully!");
          setData({
            title: "",
            menuId: "",
          });
        setTimeout(() => navigate("/dishes"), 1000);
        });
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      axios.get(import.meta.env.VITE_BASEURL + "dishes/" + id).then((res) => {
        console.log(res.data);
        setData({
          id: res.data.id,
          title: res.data.title,
          menuId: res.data.menuId,
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
              <h1>Add Dish</h1>
              <div>
                <p
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Home/AddDish"
                  className="bread fs-6"
                >
                  <span>
                    <a className="text-decoration-none text-muted" to={"/Home"}>
                      Home
                    </a>
                  </span>{" "}
                  / <span>AddDish</span>
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
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <label for="title" className="form-label fw-bold">
                    Dish Title <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={data.title}
                    id="title"
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter dish title"
                    required
                  />
                  {error.titleError && (
                    <span className="text-danger">{error.titleError}</span>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <label for="menu" className="form-label fw-bold">
                    Menu <span className="text-danger">*</span>
                  </label>
                  <select
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="form-select"
                    name="menuId"
                    id="menuId"
                    value={data.menuId}
                    required
                  >
                    <option value="0" selected>
                      Select Menu
                    </option>
                    {menuList.map((eachData) => {
                      return (
                        <option value={eachData.id}>{eachData.title}</option>
                      );
                    })}
                  </select>
                  {error.menuIdError && (
                    <span className="text-danger">{error.menuIdError}</span>
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
                    onClick={() => setData({ title: "", menuId: 0 })}
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

export default AddDish;
