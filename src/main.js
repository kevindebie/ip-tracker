// Initial function load
getData();
function getData() {
    let currentIp = '';

    fetch('https://api.ipify.org?format=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentIp = data.ip;
        })

    function getMap() {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_zC7fQED6dDwU68iNqoctowOiqweNq&ipAddress=${currentIp}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                document.getElementById("ip").innerHTML = data.ip;
                document.getElementById("location").innerHTML = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
                document.getElementById("timezone").innerHTML = data.location.timezone;
                document.getElementById("isp").innerHTML = data.isp;

            })
            .catch(function (error){
                console.log(error);
            });
    }

    // Call getMap() function to get the data from ipify
    getMap();

}