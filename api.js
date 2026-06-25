//* api.js — defines the PixabayAPI class used to fetch images from the Pixabay API.
//? A class is a blueprint for creating objects with shared properties and methods.
//~ PixabayAPI groups everything needed to communicate with the Pixabay API in one place.
//! REMOVED API KEY - USE PERSONAL KEY IF UTILISING DEMO
//import axios from "axios";

class APIGen {
  //? It stores the API key and URL from CONFIG so every method can access them via "this".
  constructor() {
    // Member: stores the API key used to authenticate every request sent.
    this.apiKey = CONFIG.apiKey;
    // Member: stores the base URL that all API requests are sent to.
    this.apiUrl = CONFIG.apiUrl;
  }

  // Method: searchImages — sends a request to Pixabay and returns matching image data.
  // @param query — the word or phrase to search for (e.g. "cats"). Typed by the user.
  // @param page  — which page of results to load. Defaults to 1 (the first page).
  async sendQuery(endpoint, params = {}) {
    const url = new URL(`${this.apiUrl}/${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    url.searchParams.append("api_key", this.apiKey);

    console.log("FINAL URL:", url);
    const response = await fetch(url, {
      headers: {
        "User-Agent": "wilderness-app/1.0",
        Accept: "application/json",
      },
    });

    return response;
  }

  async AltsendQuery(endpoint, params = {}) {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    const url = `${proxy}${this.apiUrl}/${endpoint}`;

    const response = await axios.get(url.toString(), {
      withCredentials: false,
      headers: {
        Accept: "application/json",
      },

      params: {
        parkCode: params.parkCode,
        api_key: this.apiKey,
      },
    });
    console.log("FINAL URL:", url);
    return response;
  }
}
