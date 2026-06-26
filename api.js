class APIGen {
  constructor() {
    // our api key is accessed from the config class.
    this.apiKey = CONFIG.apiKey;
    // our api url is  accessed from the config class.
    this.apiUrl = CONFIG.apiUrl;
  }

  // Sends a request to a  NPS  endpoint with the the parkcode as its query.

  async sendQuery(endpoint, params = {}) {
    const url = new URL(`${this.apiUrl}/${endpoint}`);

    console.log("FINAL URL:", url);
    const response = await axios.get(url.toString(), {
      headers: {
        "User-Agent": "wilderness-app/1.0",
        Accept: "application/json",
      },

      params: {
        parkCode: params.parkCode,
        api_key: this.apiKey,
      },
    });

    return response;
  }

  // Sends a request to a  NPS  endpoint with the the parkcode as its query.
  //temporary access to demo the events endpoint which doesn't work with normal requests from the browser because it doesn't have a cors header.
  //proxy workaround used however requries that the button has to be clicked in the proxy site for the demo
  //to work
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
