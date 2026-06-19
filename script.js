const locations = [
    // Iceland
    "64.1265,-21.8174",
    "63.9987,-22.6236",

    // Norway
    "60.3929,5.3241",
    "61.1300,7.1140",

    // Faroe Islands
    "62.0097,-6.7716",

    // Scotland
    "57.2745,-5.5165",
    "56.8730,-4.8420",

    // New Zealand
    "-45.0312,168.6626",
    "-43.5950,170.1418",
    "-41.2865,174.7762",

    // Australia
    "-42.8821,147.3272",
    "-37.8746,145.2748",

    // Japan
    "35.3607,138.7274",
    "43.0642,141.3469",
    "35.0116,135.7681",

    // Canada
    "51.1784,-115.5708",
    "49.8797,-119.4960",

    // USA
    "44.4280,-110.5885",
    "37.8651,-119.5383",

    // Chile
    "-41.4717,-72.9396"
];

function randomLocation() {
    const random = locations[Math.floor(Math.random() * locations.length)];

    // Using the official Google Maps Embed API endpoint for Street View
    const url = "https://www.google.com/maps/embed/v1/streetview" +
                "?key=AIzaSyC5671eu0WOtBBmFtrIjuTzgkhBsdF7Z3U" +
                "&location=" + encodeURIComponent(random);

    $("#streetview").attr("src", url);
}

// Load first location
randomLocation();

// Next button
$("#next").click(function () {
    randomLocation();
});