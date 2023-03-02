let currentIp = '';
let currentLat = '';
let currentLng = '';agazbptSideBar-option-editLayoutbptSideBar-option-editLayout
let map;
let marker;
let searchInput;
let dataIp = document.getElementById("ip");
let dataLocation = document.getElementById("location");
let dataTimezone = document.getElementById("timezone");
let dataIsp = document.getElementById("isp");

// Get current IP address from visitor
function defaultIp() {
    fetch('https://ipwho.is/')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentIp = data.ip;
            getData(currentIp);
            console.log(data);
        })
}

// Get the additional data based on the IP address
function getData(ipAddress) {
    fetch(`https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_a6ttiRMcItZpr2F76Xc1UQYKysBwS&ipAddress=${ipAddress}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (!data.error) {
                currentLat = data.location.lat;
                currentLng = data.location.lng;

                // Show the data in white block
                dataIp.innerHTML = data.ip;
                dataLocation.innerHTML = `${data.location.city}, ${data.location.country}`;
                dataTimezone.innerHTML = data.location.timezone;
                dataIsp.innerHTML = data.isp;

                // Get the map
                if (map !== undefined) {
                    map.remove();
                }
                getMap(currentLat, currentLng);
                document.getElementById("map").style = "opacity: 1;";
            } else {
                dataIp.innerHTML = 'Invalid IP address';
                dataLocation.innerHTML = 'Invalid query';
                dataTimezone.innerHTML = 'Invalid query';
                dataIsp.innerHTML = 'Invalid query';
                document.getElementById("map").style = "opacity: .25; pointer-events: none;";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Function to get the map with Leaflet API
function getMap(lat, lng) {
    map = L.map('map', {attributionControl: false}).setView([lat, lng], 13);

    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 16,
        subdomains:['mt0'],
    }).addTo(map);

    // Show custom marker in map
    const mapMarker = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize: [46, 56],
    });

    marker = L.marker([currentLat, currentLng], {icon: mapMarker}).addTo(map);
}

// Get search input and use it in API call
function getInput() {
    searchInput = document.getElementById("search").value;
    getData(searchInput);
}

// Press enter to submit search input
const inputEnter = document.getElementById("search");
inputEnter.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchSubmit").click();
    }
});

