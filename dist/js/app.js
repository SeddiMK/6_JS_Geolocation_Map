(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function initMap() {
        navigator.geolocation.getCurrentPosition((function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            return lat, lng;
        }));
        console.log(navigator);
        const uluru = {
            lat,
            lng
        };
        const map = new google.maps.Map(document.getElementById("map_canvas"), {
            zoom: 6,
            center: uluru
        });
        new google.maps.Marker({
            position: uluru,
            map
        });
    }
    window.initMap = initMap;
    document.getElementById("my_position").onclick = () => {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true
        });
    };
    function success({coords}) {
        const {latitude, longitude} = coords;
        const currentPosition = [ latitude, longitude ];
        getMap(currentPosition, "You are here");
    }
    function error({message}) {
        console.log(message);
    }
    let map = null;
    function getMap(position, tooltip) {
        if (null === map) map = L.map("map").setView(position, 15); else return;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker(position).addTo(map).bindPopup(tooltip).openPopup();
    }
    window["FLS"] = true;
    isWebp();
})();