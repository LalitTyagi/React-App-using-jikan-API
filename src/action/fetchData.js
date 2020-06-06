import axios from "axios";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./action";

export function fetchProducts(searchValue,count) {
    // console.log("searchValue",searchValue)
    // console.log("count",count)
  return dispatch => {
    dispatch(fetchDataRequest());
    axios
      .get(
        "https://api.jikan.moe/v3/search/anime?page="+count+"&q=" + searchValue + "&limit=16"
      )
      .then(response => {
        dispatch(fetchDataSuccess(response.data.results));
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
  };
}
