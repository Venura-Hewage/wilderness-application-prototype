const parkImg = document.getElementById("parkImg");
const parkName = document.getElementById("parkName");
const parkDesc = document.getElementById("parkDescription");
const parkAddress = document.getElementById("parkAddress");
const btn = document.getElementById("pagebutton");
let currentParkcode = "abli";

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

  parkName.innerHTML = data[0].name;
  parkDesc.innerHTML = data[0].description;
  parkAddress.innerHTML =
    data[0].addresses[0].line1 +
    " " +
    data[0].addresses[0].city +
    " " +
    data[0].addresses[0].countryCode;

  // for (let index = 0; index < data.length; index++) {
  //   console.log(data[index].description);
  //   console.log(data[index].name);

  //   console.log(data[index].images[0].url);
  // }
}

// function displayPark() {

//   try {
//     const data = await fetch( `https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`);

//     const json = await data.json();
//   }
//   catch (error) {

//  console.log(error);

//   }

// }
// when a pagination button is clicked -> search for park
// create onClick event for all pagination buttons
// the evert then passes the pagination button value, ie the park, to the fetch function
// when we find the newPark, replace data with newPark.data
// we do this by assigning innerHTML and attributes to the ids

async function getEvents() {
  try {
    console.log("This is the current park" + " " + currentParkcode);
    const data = await fetch(
      `https://developer.nps.gov/api/v1/events?parkCode=${currentParkcode}&api_key=GCXOTF0JIuC5ZmdRXUcceCboJXXlKFPN9Yd14DOD`,
    );
    const json = await data.json();
    console.log(json);
    displayEvents(json.data);
  } catch (error) {
    console.log(error);
  }
}

function displayEvents(data) {
  let accordion = document.createElement("div");
  accordion.className = "accordion";
  accordion.id = "featureaccordion";

  let limit = 3;
  data.slice(0, 3).array.forEach((element) => {
    let accordionItem = document.createElement("div");
    accordionItem.className = "accordian-item";

    let header = document.createElement("h2");
    header.className = "accordian-header";
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
    body.textContent = item.content;

    // assemble
    collapse.appendChild(body);
    header.appendChild(button);

    accordionItem.appendChild(header);
    accordionItem.appendChild(collapse);

    accordion.appendChild(accordionItem);
  });
}

load();
