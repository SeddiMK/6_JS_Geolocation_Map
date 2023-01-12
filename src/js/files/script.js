// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


//Geolocation_Map

// Map google.com

//https://v3c.ru/javascript/gugl-karta-dlya-sajta



// Initialize and add the map
function initMap() {
	navigator.geolocation.getCurrentPosition(function (position) {
		// Get the coordinates of the current position.
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		console.log(lat, lng);
		//return lat, lng;

		// Create a new map and place a marker at the device location.
		const mapG = new google.maps.Map(document.getElementById("map_canvas"), {
			zoom: 6,
			// 		center: uluru,
			// lat: lat,
			// lng: lng
			center: { lat: lat, lng: lng },
		});

		mapG.addMarker({
			lat: lat,
			lng: lng,
		});
	});
}


// function initMap() {
// 	const lat = position.coords.latitude;
// 	const lng = position.coords.longitude;
// 	console.log(position);
// 	map = new google.maps.Map(document.getElementById("map_canvas"), {
// 		center: { lat: lat, lng: lng },
// 		zoom: 8,
// 	});
// }

window.initMap = initMap;



// — при клике на метку, показать окно с информацией, на карте map с привязкой к marker.


//===========================================================================================
// Map leafletjs.com
// импортируем функцию
// import { getMap } from './map.js'

// находим кнопку и добавляем к ней обработчик
document.getElementById('my_position').onclick = () => {
	navigator.geolocation.getCurrentPosition(success, error, {
		enableHighAccuracy: true
	})
}

function success({ coords }) {
	const { latitude, longitude } = coords
	const currentPosition = [latitude, longitude]
	// вызываем функцию, передавая ей текущую позицию и сообщение
	getMap(currentPosition, 'You are here')
}

function error({ message }) {
	console.log(message)
}


// создаем локальные переменные для карты и маркера
// каждый модуль имеет собственное пространство имен
let map = null
// let marker = null

// функция принимает позицию - массив с широтой и долготой
// и сообщение, отображаемое над маркером (tooltip)
export function getMap(position, tooltip) {
	// если карта не была инициализирована
	if (map === null) {
		// второй аргумент, принимаемый методом setView - это масштаб (zoom)
		map = L.map('map').setView(position, 15)
	} else return

	// что-то типа рекламы
	// без этого карта работать не будет
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map)

	// добавляем маркер с сообщением
	L.marker(position).addTo(map).bindPopup(tooltip).openPopup()
}


//===Информация о пользователе браузера/сайта=============================================
// Info user ip, location, ...
// class userInfo {
// 	// 	constructor() {
// 	// 		this.timeOpened = new Date();
// 	// 		this.timeZone = (new Date()).getTimezoneOffset() / 60;
// 	// 	}

// 	// 	pageon() {
// 	// 		//file location
// 	// 		return window.location.pathname
// 	// 	}

// 	// 	referrer() {
// 	// 		//property returns the URL of the page that linked to this page
// 	// 		return document.referrer;
// 	// 	}
// 	// 	previousSites() {
// 	// 		//integer represeting the number of elements in the sessini history
// 	// 		return history.length;
// 	// 	}
// 	// 	browserInfo() {
// 	// 		return navigator;
// 	// 	}
// 	// 	dataCookies() {
// 	// 		return decodeURIComponent(document.cookie.split(";"));
// 	// 	}
// 	// 	dataStorage() {
// 	// 		return localStorage;
// 	// 	}
// 	// 	sizeScreen() {
// 	// 		return {
// 	// 			width: screen.width,
// 	// 			height: screen.height,
// 	// 			clientWidth: document.body.clientWidth,
// 	// 			clientHeight: document.body.clientHeight,
// 	// 			innerWidth: window.innerWidth,
// 	// 			innerHeight: window.innerHeight,
// 	// 			screenAvailWidth: screen.availWidth,
// 	// 			screenAvailHeight: screen.availHeight,
// 	// 			colorDepth: screen.colorDepth,
// 	// 			pixelDepth: screen.pixelDepth

// 	// 		}
// 	// 	}


// 	async position() {
// 		const pos = await new Promise((resolve, reject) => {
// 			navigator.geolocation.getCurrentPosition(resolve, reject);
// 		});

// 		return {
// 			long: pos.coords.longitude,
// 			lat: pos.coords.latitude,
// 			accuracy: pos.coords.accuracy,
// 			altitude: pos.coords.altitude,
// 			heading: pos.coords.heading,
// 			speed: pos.coords.speed,
// 			timestamp: pos.timestamp,
// 		};
// 	}

// 	// 	async battery() {
// 	// 		/**
// 	// 		 * charging
// 	// 		 * chargingTime
// 	// 		 * level
// 	// 		 */
// 	// 		return await navigator.getBattery();

// 	// 	}
// 	// 	async ip() {
// 	// 		/**
// 	// 		 *  city
// 	// 		 *  continent
// 	// 		 *  countryCode
// 	// 		 *  countryName
// 	// 		 *  ipAddress
// 	// 		 *  statProv
// 	// 		 */
// 	// 		let res = await (await fetch('https://api.db-ip.com/v2/free/self'));
// 	// 		let data = await res.json()
// 	// 		return data;

// 	// 	}
// }

// const info = new userInfo();

// async function t1() {
// 	// 	// console.log(info.referrer());
// 	// 	// console.log(info.previousSites());
// 	// 	// console.log(info.browserInfo());
// 	// 	// console.log(info.dataCookies());
// 	// 	// console.log(info.dataStorage());
// 	// 	// console.log(info.sizeScreen());
// 	console.log(await info.position(long, lat));
// 	// 	console.log(await info.battery());
// 	// 	console.log(await info.ip());
// }
// t1();