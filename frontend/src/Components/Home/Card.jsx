import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";

export default function MultiActionAreaCard({ props }) {
  return (
    <Card sx={{ width: "100%", boxShadow: 3, height: "400px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{
            height: 250,
            objectFit: "cover",
          }}
          image={props.Image}
          alt="car_image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Typography gutterBottom component="div">
            <span className="text-[0.8rem] ">
              Speed: {props.speed} | Price: {props.price}
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/api/cars/see/${props._id}`}>
          <Button size="small" color="primary">
            See more
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
