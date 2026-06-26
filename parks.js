const parkImg = document.getElementById("parkImg");
//const parkName = document.getElementById("parkName");
//const parkDesc = document.getElementById("parkDescription");
//const parkAddress = document.getElementById("parkAddress");
const btn = document.getElementById("pagebutton");
let currentParkcode = "abli";

const api = new APIGen();

// btn.addEventListener("click", (event) => {
//   const parkCode = event.target.value;
//   loadNewPark(parkCode);
// });

async function loadNewPark(parkCode) {
  currentParkcode = parkCode;

  try {
    // https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD
    //
    const data = await fetch(
      `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`,
    );
    const json = await data.json();
    console.log(json);
    displayData(json.data);
  } catch (error) {
    console.log(error);
  }
}

console.log("About to Fetch some data");
async function load() {
  try {
    // https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD
    // `https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`
    const data = await fetch(
      "https://developer.nps.gov/api/v1/parks?limit=5&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD",
    );
    const json = await data.json();
    console.log(json);
    displayData(json.data);
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  parkImg.setAttribute("src", data[0].images[0].url);
  parkImg.setAttribute("alt", data[0].images[0].altText);

  const card = document.getElementById("parkCard");
  card.innerHTML = "";

  card.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";

  const description = document.createElement("p");
  description.className = "card-text";

  const address = document.createElement("p");
  address.className = "card-text small text-muted";

  title.innerHTML = data[0].name;
  description.innerHTML = data[0].description;
  address.innerHTML =
    data[0].addresses[0].line1 +
    " " +
    data[0].addresses[0].city +
    " " +
    data[0].addresses[0].countryCode;

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(address);

  // }
}

// when a pagination button is clicked -> search for park
// create onClick event for all pagination buttons
// the evert then passes the pagination button value, ie the park, to the fetch function
// when we find the newPark, replace data with newPark.data
// we do this by assigning innerHTML and attributes to the ids

async function getEvents() {
  try {
    const response = await api.AltsendQuery("events", {
      parkCode: currentParkcode,
    });

    //const json = await response.json();
    const json = response.data;

    //res.json(data);

    console.log(json);
    console.log("EVENT RESPONSE:", json);
    displayEvents(json.data);
  } catch (error) {
    console.log(error);
  }
}

async function getAmenities() {
  try {
    const response = await api.sendQuery("amenities/parksplaces", {
      parkCode: currentParkcode,
    });

    //const json = await response.json();
    const json = response.data;
    //res.json(data);

    console.log(json);
    console.log("EVENT RESPONSE:", json);
    displayAmenities(json.data);
  } catch (error) {
    console.log(error);
  }
}

async function getCampgrounds() {
  try {
    const response = await api.sendQuery("campgrounds", {
      parkCode: currentParkcode,
    });

    // const json = await response.json();
    const json = response.data;

    //res.json(data);

    console.log(json);
    console.log("EVENT RESPONSE:", json);
    displayCampGrounds(json.data);
  } catch (error) {
    console.log(error);
  }
}

async function getThingstoDo() {
  try {
    const response = await api.sendQuery("thingstodo", {
      parkCode: currentParkcode,
    });

    // const json = await response.json();
    const json = response.data;

    //res.json(data);

    console.log(json);
    console.log("EVENT RESPONSE:", json);
    displayThingsToDo(json.data);
  } catch (error) {
    console.log(error);
  }
}

function displayThingsToDo(data) {
  const parkcard = document.getElementById("parkCard");
  parkcard.innerHTML = "";
  let accordion = document.createElement("div");
  parkcard.appendChild(accordion);

  accordion.className = "accordion";
  accordion.id = "featureaccordion";

  let limit = 3;
  data.slice(0, 3).forEach((item, index) => {
    let accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    let header = document.createElement("h2");
    header.className = "accordion-header";
    header.id = `heading${index}`;

    // button
    const button = document.createElement("button");
    button.className =
      index === 0 ? "accordion-button" : "accordion-button collapsed";

    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#collapse${index}`);
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    button.setAttribute("aria-controls", `collapse${index}`);

    button.textContent = item.title;

    // collapse container
    const collapse = document.createElement("div");
    collapse.id = `collapse${index}`;

    collapse.className =
      index === 0
        ? "accordion-collapse collapse show"
        : "accordion-collapse collapse";

    collapse.setAttribute("aria-labelledby", `heading${index}`);
    collapse.setAttribute("data-bs-parent", "#myAccordion");

    // accordion body
    const body = document.createElement("div");
    body.className = "accordion-body";
    body.innerHTML = item.shortDescription;

    // assemble
    collapse.appendChild(body);
    header.appendChild(button);

    accordionItem.appendChild(header);
    accordionItem.appendChild(collapse);

    accordion.appendChild(accordionItem);
  });
}

function displayCampGrounds(data) {
  const parkcard = document.getElementById("parkCard");
  parkcard.innerHTML = "";
  let accordion = document.createElement("div");
  parkcard.appendChild(accordion);

  accordion.className = "accordion";
  accordion.id = "featureaccordion";

  let limit = 3;
  data.slice(0, 3).forEach((item, index) => {
    let accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    let header = document.createElement("h2");
    header.className = "accordion-header";
    header.id = `heading${index}`;

    // button
    const button = document.createElement("button");
    button.className =
      index === 0 ? "accordion-button" : "accordion-button collapsed";

    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#collapse${index}`);
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    button.setAttribute("aria-controls", `collapse${index}`);

    button.textContent = item.name;

    // collapse container
    const collapse = document.createElement("div");
    collapse.id = `collapse${index}`;

    collapse.className =
      index === 0
        ? "accordion-collapse collapse show"
        : "accordion-collapse collapse";

    collapse.setAttribute("aria-labelledby", `heading${index}`);
    collapse.setAttribute("data-bs-parent", "#myAccordion");

    // accordion body
    const body = document.createElement("div");
    body.className = "accordion-body";
    body.innerHTML = item.description;

    // assemble
    collapse.appendChild(body);
    header.appendChild(button);

    accordionItem.appendChild(header);
    accordionItem.appendChild(collapse);

    accordion.appendChild(accordionItem);
  });
}

function displayAmenities(data) {
  const parkcard = document.getElementById("parkCard");
  parkcard.innerHTML = "";
  let accordion = document.createElement("div");
  parkcard.appendChild(accordion);

  accordion.className = "accordion";
  accordion.id = "featureaccordion";

  let limit = 3;
  data.slice(0, 3).forEach((item, index) => {
    console.log("This is an Array or not" + "= " + Array.isArray(item));
    let accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    let header = document.createElement("h2");
    header.className = "accordion-header";
    header.id = `heading${index}`;

    // button
    const button = document.createElement("button");
    button.className =
      index === 0 ? "accordion-button" : "accordion-button collapsed";

    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#collapse${index}`);
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    button.setAttribute("aria-controls", `collapse${index}`);

    button.textContent = item[0].name;

    // collapse container
    const collapse = document.createElement("div");
    collapse.id = `collapse${index}`;

    collapse.className =
      index === 0
        ? "accordion-collapse collapse show"
        : "accordion-collapse collapse";

    collapse.setAttribute("aria-labelledby", `heading${index}`);
    collapse.setAttribute("data-bs-parent", "#myAccordion");

    // accordion body
    const body = document.createElement("div");
    body.className = "accordion-body";
    body.innerHTML = item[0].parks[0].places[0].title;

    // assemble
    collapse.appendChild(body);
    header.appendChild(button);

    accordionItem.appendChild(header);
    accordionItem.appendChild(collapse);

    accordion.appendChild(accordionItem);
  });
}

function displayEvents(data) {
  const parkcard = document.getElementById("parkCard");
  parkcard.innerHTML = "";
  let accordion = document.createElement("div");
  parkcard.appendChild(accordion);

  accordion.className = "accordion";
  accordion.id = "featureaccordion";

  let limit = 3;
  data.slice(0, 3).forEach((item, index) => {
    let accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    let header = document.createElement("h2");
    header.className = "accordion-header";
    header.id = `heading${index}`;

    // button
    const button = document.createElement("button");
    button.className =
      index === 0 ? "accordion-button" : "accordion-button collapsed";

    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#collapse${index}`);
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    button.setAttribute("aria-controls", `collapse${index}`);

    button.textContent = item.title;

    // collapse container
    const collapse = document.createElement("div");
    collapse.id = `collapse${index}`;

    collapse.className =
      index === 0
        ? "accordion-collapse collapse show"
        : "accordion-collapse collapse";

    collapse.setAttribute("aria-labelledby", `heading${index}`);
    collapse.setAttribute("data-bs-parent", "#myAccordion");

    // accordion body
    const body = document.createElement("div");
    body.className = "accordion-body";
    body.innerHTML = item.description;

    // assemble
    collapse.appendChild(body);
    header.appendChild(button);

    accordionItem.appendChild(header);
    accordionItem.appendChild(collapse);

    accordion.appendChild(accordionItem);
  });
}

load();
