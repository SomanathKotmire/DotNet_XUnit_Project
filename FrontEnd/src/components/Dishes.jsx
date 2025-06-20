import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  TablePagination,
  TableSortLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
} from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dishes = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterText, setFilterText] = useState("");

  function loadData() {
    axios
      .get(import.meta.env.VITE_BASEURL + "dishes")
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
    axios.delete(import.meta.env.VITE_BASEURL + "dishes/" + id).then(() => {
      toast.success("Menu deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
      loadData();
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterCategory(event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setFilterText(event.target.value);
    setPage(0);
  };

  const filteredAndSortedProducts = data.filter((product) => {
    const matchesText =
      product.title.toLowerCase().includes(filterText.toLowerCase()) ||
      product.menu.title.toLowerCase().includes(filterText.toLowerCase());

    const matchesCategory = filterCategory
      ? product.menu.title === filterCategory
      : true;

    return matchesText && matchesCategory;
  });

  const uniqueCategories = [...new Set(data.map((dish) => dish.menu.title))];

  return (
    <div>
      <ToastContainer hideProgressBar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="pagetitle">
              <h1>Dishes</h1>
              <div>
                <p
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Home/Dishes"
                  className="bread fs-6"
                >
                  <span>
                    <a className="text-decoration-none text-muted" to={"/Home"}>
                      Home
                    </a>
                  </span>{" "}
                  / <span>Dishes</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-end">
            <Link to={"/adddish"}>
              <button className="btn btn-success mt-3 fw-bold">
                + Add Dish
              </button>
            </Link>
          </div>
        </div>

        <Box sx={{ display: "flex", gap: 2, mt: 3, mb: 2 }}>
          <Box sx={{ width: "50%" }}>
            <FormControl fullWidth>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={handleFilterChange}
                label="Filter by Category"
              >
                <MenuItem value="">All</MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: "50%" }}>
            <TextField
              fullWidth
              label="Search Dishes or Categories"
              variant="outlined"
              value={filterText}
              onChange={handleSearch}
            />
          </Box>
        </Box>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#3498db" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Sr. No.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Dish Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAndSortedProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{row.menu.title}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Link to={"/adddish/" + row.id}>
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 2,
            }}
          >
            <TablePagination
              component="div"
              count={filteredAndSortedProducts.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[3, 5, 10]}
            />
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default Dishes;
