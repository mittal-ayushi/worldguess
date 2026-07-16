
//const actualLocation = [55.761226, 37.594540];

// Create map
const map = L.map("map").setView([20, 0], 2);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
}).addTo(map);
let guessMarker = null;
let actualMarker = null;
let line = null;

let guessedLatLng = null;
let guessConfirmed = false;

map.on("click", function (e) {

    // Don't allow another guess after confirming
    if (guessConfirmed) return;

    guessedLatLng = e.latlng;

    if (guessMarker) {
        map.removeLayer(guessMarker);
    }

    guessMarker = L.marker(guessedLatLng)
        .addTo(map)
        .bindPopup("Your Guess")
        .openPopup();
});
document.getElementById("Confirm").addEventListener("click", function () {

    if (guessConfirmed || guessedLatLng === null) {
        return;
    }

    guessConfirmed = true;

    actualMarker = L.marker(actualLocation)
        .addTo(map)
        .bindPopup("Actual Location");

    line = L.polyline(
        [guessedLatLng, actualLocation],
        {
            color: "red",
            weight: 3
        }
    ).addTo(map);

    const bounds = L.latLngBounds([
        guessedLatLng,
        L.latLng(actualLocation)
    ]);

    map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 10,
        animate: true
    });

    const distance = map.distance(
        guessedLatLng,
        L.latLng(actualLocation)
    );

    document.getElementById("distance").innerHTML =
        `<b>Distance:</b> ${(distance / 1000).toFixed(2)} km`;

    // Disable button so it can't be pressed again
    this.disabled = true;
});
$("#next").click(function () {

    randomLocation();

    if (guessMarker) map.removeLayer(guessMarker);
    if (actualMarker) map.removeLayer(actualMarker);
    if (line) map.removeLayer(line);

    guessMarker = null;
    actualMarker = null;
    line = null;

    guessedLatLng = null;
    guessConfirmed = false;

    document.getElementById("Confirm").disabled = false;
    document.getElementById("distance").innerHTML = "";

    map.setView([20, 0], 2);
});

// BUTTON TOGGLE

const mapDiv = document.getElementById("map");
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
    if (mapDiv.style.display === "none" || mapDiv.style.display === "") {
        mapDiv.style.display = "block";
        toggle.textContent = "Close Map";

        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    } else {
        mapDiv.style.display = "none";
        toggle.textContent = "Open Map";
    }
});
