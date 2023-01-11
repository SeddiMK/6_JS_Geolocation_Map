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
    const $cities = document.getElementById("cities");
    (async () => {
        const response = await fetch("../cities.json");
        const cities = await response.json();
        console.log(cities);
        for (const city in cities) {
            const $button = document.createElement("button");
            $button.textContent = city;
            const {lat, lon} = cities[city];
            $button.dataset.city = city;
            $button.dataset.lat = lat;
            $button.dataset.lon = lon;
            $cities.append($button);
        }
    })();
    $cities.addEventListener("click", (({target}) => {
        if ("BUTTON" !== target.tagName) return;
        const {city, lat, lon} = target.dataset;
        const position = [ lat, lon ];
        getMap(position, city);
    }));
    let map = null;
    let marker = null;
    function getMap(position, tooltip) {
        if (null === map) map = L.map("map").setView(position, 15); else map.flyTo(position);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        if (marker) map.removeLayer(marker);
        marker = new L.Marker(position).addTo(map).bindPopup(tooltip).openPopup();
    }
    window["FLS"] = true;
    isWebp();
})();