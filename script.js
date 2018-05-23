document.addEventListener("DOMContentLoaded", function () {
    var lnkAll = document.querySelector("#lnkAll");
    var lnkNear = document.querySelector("#lnkNear");
    var lnkMap = document.querySelector("#lnkMap");

    var mapContainer = document.querySelector("#mapContainer");
    var list = document.querySelector("#list ul");
    var listTitle = document.querySelector("#listTitle");

    lnkAll.addEventListener("click", function () {
        var html = "";
        for (var r of restaurants) {
            html += "<li><h3>" + r.name + "</h3>";
            html += "<p><address>" + r.address + "</address></p>";
            html += "</li>";
        }
        list.innerHTML = html;
        listTitle.innerHTML = "All Restaurants";
    });
    //start here
    //get the users position, adding event to lnkNear button
    //will use wifi, if cant wifi then will use GPS
    lnkNear.addEventListener("click", function () {
        navigator.geolocation.getCurrentPosition(
            function (location) {
                var lat = location.coords.latitude;
                var lon = location.coords.longitude;
                listTitle.innerHTML = "Nearby" + lat + "," + lon;
            },
            //error message
            function () {
                alert("We can't locate you!");
            },
            {
                //maximumAge = if got location in the last minute, don't get it again|timeout = how long to try
                enableHighAccuracy: true,
                maximumAge: 60000,
                timeout: 30000,
            }
            );
    });
    //end here

    lnkMap.addEventListener("click", function () {
        if (mapContainer.className == "hidden") {
            mapContainer.className = "";
            lnkMap.innerHTML = "Hide Map";
        } else {
            mapContainer.className = "hidden";
            lnkMap.innerHTML = "Show Map";
        }
    });
});
var map;

function initMap() {
    //creating map w/ random lat and lon
    var uluru = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    for(var r of r)
    //creates a marker
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}


//start here
//lnkNear.addEventListener("click", function () {
//    navigator.geolocation.getCurrentPosition(
//        function (location) {
//            var lat = location.coords.latitude;
//            var lon = location.coords.longitude;
//            listTitle.innerHTML = "Nearby " + lat + "," + lon;
//            map.setCenter({ lat: lat, lng: lon });

//            var html = "";
//            for (var r of restaurants) {
//                var distance = getDistance(lat, lon, r.lat, r.lon);
//                var distanceMiles = distance / 0.62;
//                html += "<li><h3>" + r.name + "</h3>";
//                html += "<p><address>" + r.address + "</address>";
//                html += "<span class='distance'>" + distance.toFixed(1) + "km</span></p>";
//                html += "</li>";
//            }
//            list.innerHTML = html;

//        },
//        function () {
//            alert("We can't locate you");
//        },
//        {
//            enableHighAccuracy: true,
//            maximumAge: 60000,
//            timeout: 5000
//        }
//    );
//});
//end here