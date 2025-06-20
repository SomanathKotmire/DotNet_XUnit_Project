import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Menus = () => {
  const [data, setData] = useState([]);

  function loadData() {
    axios
      .get(import.meta.env.VITE_BASEURL + "menus")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleDelete(e, id) {
    e.preventDefault();
    axios.delete(import.meta.env.VITE_BASEURL + "menus/" + id).then((res) => {
      console.log(res.data);
      toast.success("Menu deleted successfully!",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false
      });
      loadData();
    });
  }

  return (
    <div>
      <ToastContainer hideProgressBar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="pagetitle">
              <h1>Menus</h1>
              <div>
                <p
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Home/Menus"
                  className="bread fs-6"
                >
                  <span>
                    <a className="text-decoration-none text-muted" to={"/Home"}>
                      Home
                    </a>
                  </span>{" "}
                  / <span>Menus</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-end">
            <Link to={"/addmenu"}>
              <button className="btn btn-success mt-3 fw-bold">
                + Add Menu
              </button>
            </Link>
          </div>
        </div>

        <div>
          <Paper>
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#3498db" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Sr. No</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow key={row.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Link to={"/addmenu/" + row.id}>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            onClick={(e) => handleDelete(e, row.id)}
                            variant="contained"
                            color="error"
                            size="small"
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Menus;
