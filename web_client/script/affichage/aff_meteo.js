import Handlebars from "handlebars";
import {semaine} from "../tools/config";

const titleToPicto = {
	"Orageux": "resources/meteo_picto/cloud-bolt-solid.svg",
	"Pluvieux": "resources/meteo_picto/cloud-showers-heavy-solid.svg",
	"Nuageux": "resources/meteo_picto/cloud-sun-solid.svg",
	"Brumeux": "resources/meteo_picto/smog-solid.svg",
	"Ensoleillé": "resources/meteo_picto/sun-solid.svg"
}

const meteo_template = document.getElementById('meteo_template');
let meteo = Handlebars.compile(meteo_template.innerHTML);

export function displayMeteo(data) {
	let [date, nowData] = setupDate(data);

	let meteoData = {};

	meteoData.current_day = getCurrentDay(date, nowData);
	meteoData.hours = getNextHours(date, data);
	meteoData.days = getNextDays(date, data);

	document.getElementById('meteo').innerHTML = meteo(meteoData);

	document.getElementById('toggleMeteo').addEventListener('change', () => {
		document.getElementById('meteo_week').classList.toggle('show');
	});
}

function setupDate(data) {
	let dateElement = new Date();
	dateElement.setMinutes(0);
	dateElement.setSeconds(0);

	let date = dateToString(dateElement);
	let nowData = data[date];

	if (!nowData) {
		dateElement.setHours(dateElement.getHours() - 1);
		date = dateToString(dateElement);
		nowData = data[date];
	}
	if (!nowData) {
		dateElement.setHours(dateElement.getHours() + 2);
		date = dateToString(dateElement);
		nowData = data[date];
	}
	return [date, nowData];
}

function getCurrentDay(date, nowData) {
	return {
		temp: Math.round((nowData.temperature['2m'] - 273.15)) + "°C",
		heure: date.slice(11, 16),
		jour: semaine[new Date(date).getDay()],
		descr: getWeatherPicto(nowData)
	};
}

function getNextHours(date, data) {
	let hours = [];

	for (let i = 0; i < 8; i++) {
		let hour = new Date(date);
		let newHour = hour.getHours() + i * 3;

		if (newHour >= 24) hour.setDate(hour.getDate() + 1);
		hour.setHours(newHour % 24);

		let hourData = data[dateToString(hour)];

		hours.push({
			heure: dateToString(hour).slice(11, 16),
			temp: Math.round((hourData.temperature['2m'] - 273.15)) + "°C",
			picto: titleToPicto[getWeatherPicto(hourData)]
		});
	}

	return hours;
}

function getNextDays(date, data) {
	let days = [];

	for (let i = 0; i < 8; i++) {
		let day = new Date(date);
		day.setDate(day.getDate() + i);

		let dayData = data[dateToString(day)];

		days.push({
			jour: semaine[day.getDay()].slice(0, 3),
			temp: Math.round(dayData.temperature['2m'] - 273.15) + "°C"
		});

		if (i === 0) days[i].current = true;
	}

	return days;
}

function dateToString(date) {
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let hour = date.getHours();
	return date.getFullYear() + "-"
		+ (month < 10 ? "0" : "") + month + "-"
		+ (day < 10 ? "0" : "") + day + " "
		+ (hour < 10 ? "0" : "") + hour + ":00:00";
}

function getWeatherPicto(data) {
	if (data.pluie > 0.5) {
		if (data.cape > 1000) {
			return "Orageux";
		} else {
			return "Pluvieux";
		}
	} else if (data.nebulosite.totale > 80) {
		return "Nuageux";
	} else if (data.humidite['2m'] > 90) {
		return "Brumeux";
	} else {
		return "Ensoleillé";
	}
}