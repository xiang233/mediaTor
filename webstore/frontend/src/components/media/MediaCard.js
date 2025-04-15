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
function MediaCard({
  header,
  subheader,
  title,
  secondary,
  picture,
  additional,
  index,
}) {
  const theme = createTheme();
//   console.log(header, subheader, title, secondary)
  return (
    <Fragment key={index}>
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
                color="text.primary"
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
                {subheader?subheader:"Date Unknown"}
              </Typography>
            }
            width="20px"
          />

          <CardActionArea component={Link} to={`media_search/${index}`}>
            {picture && picture.length >= 1 ? (
              <CardMedia>
                <AspectRatio width="100%" height="12em">
                  <Image
                    src={picture ? (additional?.key=="tmdb_img_url"? "https://image.tmdb.org/t/p/w500"+picture:picture) : null}
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

              <div className={"flex-grow"} />
            </CardContent>
          </CardActionArea>
        </Card>
      </ThemeProvider>{" "}
    </Fragment>
  );
}

export default MediaCard;
