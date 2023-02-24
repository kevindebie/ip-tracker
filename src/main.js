let currentIp = '';
let currentLat = '';
let currentLng = '';
let map;
let marker;
let searchInput;
let dataIp = document.getElementById("ip");
let dataLocation = document.getElementById("location");
let dataTimezone = document.getElementById("timezone");
let dataIsp = document.getElementById("isp");

// Get current IP address from visitor
function defaultIp() {
    fetch('http://ip-api.com/json/')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentIp = data.query;
            getData(currentIp);
        })
}

// Get the additional data based on the IP address
function getData(ipAddress) {
    fetch(`http://ip-api.com/json/${ipAddress}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.status == 'success') {
                console.log(data);
                currentLat = data.lat;
                currentLng = data.lon;

                // Show the data in white block
                dataIp.innerHTML = data.query;
                dataLocation.innerHTML = `${data.city}, ${data.countryCode} ${data.zip}`;
                dataTimezone.innerHTML = data.timezone;
                dataIsp.innerHTML = data.isp;

                // Get the map
                if (map !== undefined) {
                    map.remove();
                }
                getMap(currentLat, currentLng);
                document.getElementById("map").style = "opacity: 1;";
            } else {
                console.log(data);
                dataIp.innerHTML = 'Invalid IP address';
                dataLocation.innerHTML = 'Invalid query';
                dataTimezone.innerHTML = 'Invalid query';
                dataIsp.innerHTML = 'Invalid query';
                document.getElementById("map").style = "opacity: .25;";
            }
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

