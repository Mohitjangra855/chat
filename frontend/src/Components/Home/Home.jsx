import axios from "axios";
import React, { useState, useEffect } from "react";
import {ToastContainer} from "react-toastify"
import { handleError } from "../../utils";
import MultiActionAreaCard from "./Card"

import Grid from "@mui/material/Grid"; // Import Grid for layout
const Home = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("http://localhost:3000/api/cars")
          // console.log(response)
          setData(response.data.data)
          // console.log(data)
      } catch (err) {
        handleError(err)
      }
    };
    fetchData()
  });
  return <div className="w-full h-full p-5 bg-slate-400 flex flex-row flex-wrap gap-4">
     <Grid container spacing={2} justifyContent="center">
      {data.length > 0 ? (
        data.map((car) => (
          <Grid
            item
            xs={12} // On extra small devices (mobile), each card will take full width
            sm={6}  // On small screens, each card will take 50% of the width (2 cards per row)
            md={4}  // On medium screens, each card will take 33.33% of the width (3 cards per row)
            lg={3}  // On large screens, each card will take 25% of the width (4 cards per row)
            key={car._id}
          >
            <MultiActionAreaCard props={car} />
          </Grid>
        ))
      ) : (
        <p>No cars available</p>
      )}
    </Grid>

     <ToastContainer/>
  </div>;
};

export default Home;
