import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "../../components/general/flexCards.module.css";
import MediaCard from "../../components/media/MediaCard";
import { Heading } from "@chakra-ui/react";
import FormContainer from "../../components/general/FormContainer";
import {
  Container,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import errorHandler from "../../services/errorHandler";
import axios from "axios";
import { getSearch } from "../../services/getSearch";
import { categoryList, categoryObj, categoryAPI } from "./categoryList";
import { getObjRef } from "../../services/getObjRef";
import { useOutletContext } from "react-router-dom";
import { TextField, IconButton, Autocomplete, Grid, Box } from "@mui/material";
import { Search } from '@mui/icons-material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from 'uuid';

function MediaHomeScreen() {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useOutletContext();
  const loaded = React.useRef(false);
  const [handledQuery, setHandledQuery] = useState("");
  const [checkedCategories, setCheckedCategories] = useState([]);
  const throttling = useRef(false);
  const theme = createTheme();
  var match = require('autosuggest-highlight/match');
  var parse = require('autosuggest-highlight/parse');
  const inputHandler = (e, value) => {

    setQuery(value);
    if (throttling.current) {
      return;
    }
    if (value.trim() != "") {
      getSearch(setSuggestions, value, checkedCategories);
      // setSuggestions(getSearch()); this is incorrect; suggestions set before the async request is complete
    } else {
      setSuggestions([]);
    }
    console.log("suggestions", suggestions)
    throttling.current = true;
    setTimeout(() => {
      throttling.current = false;
    }, 500);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getSearch(setSearchResult, query, checkedCategories, setHandledQuery);
  }

  const handleCategoriesCheck = (val) => {
    setCheckedCategories(val);
  };

  return (
    <ThemeProvider theme={theme}>
    <Container>
      category
      <ToggleButtonGroup
        type="checkbox"
        value={checkedCategories}
        onChange={handleCategoriesCheck}
      >
        {categoryList.map((category, i) => (
          // <div key={i}>
          //   <Form.Check
          //     type={"checkbox"}
          //     label={category}
          //   />
          // </div>
          <ToggleButton id={`tbg-btn-${i}`} key={i} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Form
      onSubmit={submitHandler}
      >
        <Form.Group className="mb-3">
          <Autocomplete
            freeSolo
            open={true}
            placeholder="Chainsaw Man"
            filterSelectedOptions
            filterOptions={(options) => options}
            getOptionLabel={(option) => {
                console.log("option", option)
                return typeof(option)==="object"?getObjRef(option, categoryAPI[option["category"]]["toCard"]["title"]) || "":"";
            }
              }
            options={suggestions}
            inputValue={query}
            onInputChange={(event, newInputValue) => 
                inputHandler(event, newInputValue)}
            renderInput={(params) => (
                <TextField {...params} label="Enter the search term" placeholder="Chainsaw Man" 
                InputProps={{...params.InputProps, endAdornment: <IconButton type="submit" > 
                <Search style={{ fill: "light-blue" }}/>
              </IconButton>}}/>
              )}
            noOptionsText="No suggestions "
            renderOption={(props, option) => {
                console.log("autocomplete options", option)
                const title = getObjRef(option,categoryAPI[option["category"]]["toCard"]["title"]) || "";
                console.log("title", title)
                const matches =
                  match(title, query) || [];
                  console.log("matches", matches)
                const parts = parse(title,matches
                );
                console.log("parts", parts);
        
                return (
                  <li {...props} key = {uuidv4()}>
                    <Grid container alignItems="center">
                      <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                        {parts.map((part, index) => (
                          <Box
                            key={index}
                            component="span"
                            sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                          >
                            {part.text}
                          </Box>
                        ))}
                      </Grid>
                    </Grid>
                  </li>
                );
              }}
          /> 
        </Form.Group>
        
      </Form>
      Search results for "{handledQuery}":
      <div className={styles.flex_posts}>
        {!searchResult || searchResult.length == 0 ? (
          <>No result</>
        ) : (
            searchResult.map((suggestion, i) => (
            <MediaCard
              header={suggestion["category"]}
              {...Object.fromEntries(
                Object.entries(categoryAPI[suggestion["category"]]["toCard"])
                  .filter(([k, v]) => k !== "additional")
                  .map(([k, v]) => [k, getObjRef(suggestion, v)])
              )}
              additional={
                categoryAPI[suggestion["category"]]["toCard"]["additional"]
              }
              index={i}
              key={i}
              //   subheader={suggestion.genres[0]}
            ></MediaCard>
          ))
        )}
      </div>
    </Container>
    </ThemeProvider>
  );
}

export default MediaHomeScreen;
