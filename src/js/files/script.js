// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


//Geolocation_Map

/
// импортируем функцию
// import { getMap } from './map.js'

// находим кнопку и добавляем к ней обработчик

// получаем контейнер для городов
const $cities = document.getElementById('cities');
(async () => {
	// получаем объект с городами
	const response = await fetch('cities.json');
	const cities = await response.json();
	console.log(cities);
	// перебираем города
	for (const city in cities) {
		// создаем кнопку
		const $button = document.createElement('button');

		// текстовое содержимое кнопки - название города
		$button.textContent = city

		// получаем широту и долготу
		const { lat, lon } = cities[city]

		// записываем название города, широту и долготу
		// в соответствующие data-атрибуты
		$button.dataset.city = city
		$button.dataset.lat = lat
		$button.dataset.lon = lon

		// добавляем кнопку в контейнер
		$cities.append($button)
	}
})()

// обрабатываем нажатие кнопки
$cities.addEventListener('click', ({ target }) => {
	// нас интересует только нажатие кнопки
	if (target.tagName !== 'BUTTON') return

	// получаем название города, широту и долготу из data-атрибутов
	const { city, lat, lon } = target.dataset
	const position = [lat, lon]
	// вызываем функцию, передавая ей позицию и название города
	getMap(position, city)
})


	/ создаем локальные переменные для карты и маркера
// каждый модуль имеет собственное пространство имен
let map = null
let marker = null

export function getMap(position, tooltip) {
	if (map === null) {
		map = L.map('map').setView(position, 15)
	} else {
		// перемещение к следующей позиции
		map.flyTo(position)
	}

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map)

	// удаление предыдущего маркера
	if (marker) {
		map.removeLayer(marker)
	}
	marker = new L.Marker(position).addTo(map).bindPopup(tooltip).openPopup()
}


//================================================
// Info user ip, location, ...
// class userInfo {
// 	constructor() {
// 		this.timeOpened = new Date();
// 		this.timeZone = (new Date()).getTimezoneOffset() / 60;
// 	}

// 	pageon() {
// 		//file location
// 		return window.location.pathname
// 	}

// 	referrer() {
// 		//property returns the URL of the page that linked to this page
// 		return document.referrer;
// 	}
// 	previousSites() {
// 		//integer represeting the number of elements in the sessini history
// 		return history.length;
// 	}
// 	browserInfo() {
// 		return navigator;
// 	}
// 	dataCookies() {
// 		return decodeURIComponent(document.cookie.split(";"));
// 	}
// 	dataStorage() {
// 		return localStorage;
// 	}
// 	sizeScreen() {
// 		return {
// 			width: screen.width,
// 			height: screen.height,
// 			clientWidth: document.body.clientWidth,
// 			clientHeight: document.body.clientHeight,
// 			innerWidth: window.innerWidth,
// 			innerHeight: window.innerHeight,
// 			screenAvailWidth: screen.availWidth,
// 			screenAvailHeight: screen.availHeight,
// 			colorDepth: screen.colorDepth,
// 			pixelDepth: screen.pixelDepth

// 		}
// 	}


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

// 	async battery() {
// 		/**
// 		 * charging
// 		 * chargingTime
// 		 * level
// 		 */
// 		return await navigator.getBattery();

// 	}
// 	async ip() {
// 		/**
// 		 *  city
// 		 *  continent
// 		 *  countryCode
// 		 *  countryName
// 		 *  ipAddress
// 		 *  statProv
// 		 */
// 		let res = await (await fetch('https://api.db-ip.com/v2/free/self'));
// 		let data = await res.json()
// 		return data;

// 	}
// }

// const info = new userInfo();

// async function t1() {
// 	// console.log(info.referrer());
// 	// console.log(info.previousSites());
// 	// console.log(info.browserInfo());
// 	// console.log(info.dataCookies());
// 	// console.log(info.dataStorage());
// 	// console.log(info.sizeScreen());
// 	//console.log(await info.position());
// 	console.log(await info.battery());
// 	console.log(await info.ip());
// }
// t1();