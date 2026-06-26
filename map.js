var map1 = document.getElementById("map");

map1 = L.map("map1").setView([37.5311, -85.7375], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map1);

map1.on("click", function (e) {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(
      "Lat: " + e.latlng.lat.toFixed(5) + "<br>Lng: " + e.latlng.lng.toFixed(5),
    )
    .openOn(map1);
});

var marker = L.marker([37.53184, -85.73615]).addTo(map1);
