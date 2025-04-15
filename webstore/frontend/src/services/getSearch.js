import axios from "axios";
import errorHandler from "./errorHandler";
import { categoryAPI } from "../screens/media/categoryList";
import { getObjRef } from "./getObjRef";
import { sortByTitleMatch } from "./sortByTitleMatch";

export const getSearch = async (
  setSuggestions,
  query,
  checkedCategories,
  setHandledQuery
) => {
  var results = [];
  for (const [category, obj] of Object.entries(categoryAPI)) {
    if (category == "Book" || !checkedCategories.includes(category)) {
      continue;
    }
    try {
      console.log(category, query);
      // const obj = categoryAPI[category];
      if (obj["isGraphQL"] == undefined) {
        const hasPathParam = obj["queryParamName"] === null;
        const queryParam = {};
        queryParam[obj["queryParamName"]] = hasPathParam ? null : query;
        const url = `${obj["url"]}${hasPathParam ? query : ""}`;
        console.log(url, queryParam, obj["url"], query);
        const data = await axios
          .get(url, {
            params: {
              ...(query && !hasPathParam && queryParam),
              ...obj["params"],
            },
            ...obj["headersObj"] 
          })
          .then((response) => {
            console.log(category, query, "response", response);
            obj["dataPath"].map(function(cur) {
            results.push(...getObjRef(response, cur).map(
                (x) => ({ ...x, category: category })
              ));
          });
        });
        

        // .catch((err) => console.log(err.message));
      } else {
        var variables = JSON.parse(JSON.stringify(obj["variables"]));
        variables["search"] = query;
        console.log(variables);
        const data = await axios
          .post("https://graphql.anilist.co", {
            query: obj["query"],
            variables,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            //   console.log(eval("response.data.results"));
            console.log("response", response);
            console.log(obj["dataPath"]);
            obj["dataPath"].map(function(cur) {
                console.log("getobj", getObjRef(response, cur));
                results.push(...getObjRef(response, cur).map(
                    (x) => ({ ...x, category: category })
                  ));
              });
          });
      }
    } catch (error) {
      errorHandler(error);
    }
  }
  console.log("results", results);

  results.sort((a, b) => sortByTitleMatch(a, b, query));

  setSuggestions(results);
  if (setHandledQuery) {setHandledQuery(query);}
};
