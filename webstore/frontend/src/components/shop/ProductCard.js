import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardHeader,
  Avatar,
} from "@mui/material";
import { Fragment } from "react";
import Chip from "@mui/material/Chip";
import { Image, AspectRatio } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function ProductCard({header, subheader, title, secondary, picture,additional, i}) {
  const theme = createTheme();
  return (
    <Fragment key={i}>
      <ThemeProvider theme={theme}>
        <Card sx={{ width: "100%", height: "100%" }} variant="outlined">
          <CardHeader
            sx={{
              display: "flex",
              overflow: "hidden",
              "& .MuiCardHeader-content": {
                overflow: "hidden",
              },
              paddingBottom: 0.5,
            }}
            title={
              <Typography
                variant="body2"
                sx={{
                  fontSize: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  maxHeight: "4em",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  width: "100%",
                }}
              >
                {header}
              </Typography>
            }
            subheader={
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: 10,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  maxHeight: "4em",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  width: "100%",
                }}
              >
                {subheader}
              </Typography>
            }
            width="20px"
          />
          <Link to= {`/shop/product/${additional._id}`}>
          <CardActionArea>
            {picture && picture.length >= 1 ? (
              <CardMedia>
                <AspectRatio width="100%" height="12em">
                  <Image
                    src={picture ? picture[0] : null}
                    objectFit="cover"
                    alt={title}
                    height="12em"
                  ></Image>
                </AspectRatio>{" "}
              </CardMedia>
            ) : (
              ""
            )}

            <CardContent sx={{}}>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  maxHeight: "4em",
                  fontWeight: "bold",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  lineHeight: "1.2em",
                  marginBottom: "1em",
                }}
                variant="h6"
                component="div"
              >
                {title}
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  maxHeight: "5em",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              ></Typography>
              {picture && picture.length >= 1 ? (
                ""
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    maxHeight: "5em",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {secondary}
                </Typography>
              )}

              <div className={"flex-grow"} />
            </CardContent>
          </CardActionArea>
          </Link>
        </Card>
      </ThemeProvider>{" "}
    </Fragment>
  );
}

export default ProductCard;
