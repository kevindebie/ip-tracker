let currentIp = '';
let currentLat = '';
let currentLng = '';
let map;
let marker;

// Get current IP address from visitor
function defaultIp() {
    fetch('https://api.ipify.org?format=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentIp = data.ip;
            getData(`ipAddress=${currentIp}`);
        })
}

// Get the additional data based on the IP address
function getData(ipAddress) {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_zC7fQED6dDwU68iNqoctowOiqweNq&${ipAddress}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentLat = data.location.lat;
            currentLng = data.location.lng;

            // Show the data in white block
            document.getElementById("ip").innerHTML = data.ip;
            document.getElementById("location").innerHTML = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
            document.getElementById("timezone").innerHTML = data.location.timezone;
            document.getElementById("isp").innerHTML = data.isp;

            // Get the map
            if (map !== undefined) {
                map.remove();
            }
            getMap(currentLat, currentLng);

        })
        .catch(function (error) {
            console.log(error);
        });
}

// Function to get the map with Leaflet API
function getMap(lat, lng) {
    map = L.map('map', {attributionControl: false}).setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 16,
    }).addTo(map);

    // Show custom marker in map
    const mapMarker = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize: [46, 56],
    });

    marker = L.marker([currentLat, currentLng], {icon: mapMarker}).addTo(map);
}

// Get search input
function getInput() {
    let searchIp = document.getElementById("search").value;
    getData(`ipAddress=${searchIp}`);
}

// Press enter to submit search input
const inputEnter = document.getElementById("search");
inputEnter.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchSubmit").click();
    }
});

