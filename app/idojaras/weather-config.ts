// Konfiguráció az olaszországi út időjárás-előrejelzéséhez.
// Adatforrás: Open-Meteo (https://open-meteo.com) – ingyenes, API-kulcs nélkül.

export type Place = {
	id: string;
	name: string;
	lat: number;
	lon: number;
};

export type Day = {
	date: string; // ISO dátum, pl. "2026-09-15"
	label: string; // rövid tab-felirat
	title: string; // fő cím
	placeIds: string[]; // az adott naphoz tartozó helyszínek
};

// Minden egyedi helyszín (koordinátákkal) – egyetlen batch-lekérésben töltjük le.
export const PLACES: Place[] = [
	{ id: "roma", name: "Róma", lat: 41.9028, lon: 12.4964 },
	{ id: "pisa", name: "Pisa", lat: 43.7228, lon: 10.4017 },
	{ id: "siena", name: "Siena", lat: 43.3188, lon: 11.3308 },
	{ id: "asciano", name: "Asciano", lat: 43.2333, lon: 11.5667 },
	{ id: "montepulciano", name: "Montepulciano", lat: 43.0928, lon: 11.7799 },
	{ id: "pienza", name: "Pienza", lat: 43.0785, lon: 11.6788 },
	{ id: "firenze", name: "Firenze", lat: 43.7696, lon: 11.2558 },
	{ id: "velence", name: "Velence", lat: 45.4408, lon: 12.3155 },
];

export const DAYS: Day[] = [
	{
		date: "2026-09-15",
		label: "Szept. 15",
		title: "Róma",
		placeIds: ["roma"],
	},
	{
		date: "2026-09-16",
		label: "Szept. 16",
		title: "Pisa",
		placeIds: ["pisa"],
	},
	{
		date: "2026-09-17",
		label: "Szept. 17",
		title: "Toszkána körút",
		placeIds: ["siena", "asciano", "montepulciano", "pienza"],
	},
	{
		date: "2026-09-18",
		label: "Szept. 18",
		title: "Firenze",
		placeIds: ["firenze"],
	},
	{
		date: "2026-09-19",
		label: "Szept. 19",
		title: "Firenze",
		placeIds: ["firenze"],
	},
	{
		date: "2026-09-20",
		label: "Szept. 20",
		title: "Velence",
		placeIds: ["velence"],
	},
];

export const TIMEZONE = "Europe/Rome";

// WMO időjárás-kódok magyar leírással és ikonkulccsal.
// Az ikonkulcshoz a page.tsx rendel lucide-react komponenst.
export type WeatherInfo = { label: string; icon: WeatherIconKey };

export type WeatherIconKey =
	| "sun"
	| "cloud-sun"
	| "cloud"
	| "cloudy"
	| "fog"
	| "drizzle"
	| "rain"
	| "rain-wind"
	| "snow"
	| "thunder";

const WMO: Record<number, WeatherInfo> = {
	0: { label: "Derült", icon: "sun" },
	1: { label: "Túlnyomóan derült", icon: "sun" },
	2: { label: "Részben felhős", icon: "cloud-sun" },
	3: { label: "Borult", icon: "cloudy" },
	45: { label: "Köd", icon: "fog" },
	48: { label: "Zúzmarás köd", icon: "fog" },
	51: { label: "Gyenge szitálás", icon: "drizzle" },
	53: { label: "Szitálás", icon: "drizzle" },
	55: { label: "Erős szitálás", icon: "drizzle" },
	56: { label: "Ónos szitálás", icon: "drizzle" },
	57: { label: "Erős ónos szitálás", icon: "drizzle" },
	61: { label: "Gyenge eső", icon: "rain" },
	63: { label: "Eső", icon: "rain" },
	65: { label: "Erős eső", icon: "rain-wind" },
	66: { label: "Ónos eső", icon: "rain" },
	67: { label: "Erős ónos eső", icon: "rain-wind" },
	71: { label: "Gyenge havazás", icon: "snow" },
	73: { label: "Havazás", icon: "snow" },
	75: { label: "Erős havazás", icon: "snow" },
	77: { label: "Hódara", icon: "snow" },
	80: { label: "Gyenge zápor", icon: "rain" },
	81: { label: "Zápor", icon: "rain" },
	82: { label: "Heves zápor", icon: "rain-wind" },
	85: { label: "Hózápor", icon: "snow" },
	86: { label: "Erős hózápor", icon: "snow" },
	95: { label: "Zivatar", icon: "thunder" },
	96: { label: "Zivatar jégesővel", icon: "thunder" },
	99: { label: "Erős zivatar jégesővel", icon: "thunder" },
};

export function weatherInfo(code: number | undefined): WeatherInfo {
	if (code === undefined || !(code in WMO)) {
		return { label: "Ismeretlen", icon: "cloud" };
	}
	return WMO[code];
}

// ---- Open-Meteo lekérés és típusok ----

const HOURLY_VARS = [
	"temperature_2m",
	"relative_humidity_2m",
	"apparent_temperature",
	"precipitation_probability",
	"precipitation",
	"weather_code",
	"wind_speed_10m",
	"wind_gusts_10m",
	"uv_index",
	"cloud_cover",
];

const DAILY_VARS = [
	"weather_code",
	"temperature_2m_max",
	"temperature_2m_min",
	"apparent_temperature_max",
	"apparent_temperature_min",
	"sunrise",
	"sunset",
	"uv_index_max",
	"precipitation_sum",
	"precipitation_probability_max",
	"wind_speed_10m_max",
];

export type Forecast = {
	hourly: {
		time: string[];
		temperature_2m: number[];
		relative_humidity_2m: number[];
		apparent_temperature: number[];
		precipitation_probability: number[];
		precipitation: number[];
		weather_code: number[];
		wind_speed_10m: number[];
		wind_gusts_10m: number[];
		uv_index: number[];
		cloud_cover: number[];
	};
	daily: {
		time: string[];
		weather_code: number[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		apparent_temperature_max: number[];
		apparent_temperature_min: number[];
		sunrise: string[];
		sunset: string[];
		uv_index_max: number[];
		precipitation_sum: number[];
		precipitation_probability_max: number[];
		wind_speed_10m_max: number[];
	};
};

// Egyetlen batch-kérés az összes helyszínre. Az Open-Meteo tömböt ad vissza,
// ha több koordinátát adunk meg vesszővel elválasztva.
export async function fetchAllForecasts(): Promise<Record<string, Forecast>> {
	const lat = PLACES.map((p) => p.lat).join(",");
	const lon = PLACES.map((p) => p.lon).join(",");

	const url =
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
		`&hourly=${HOURLY_VARS.join(",")}` +
		`&daily=${DAILY_VARS.join(",")}` +
		`&timezone=${encodeURIComponent(TIMEZONE)}&forecast_days=16`;

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Open-Meteo hiba: ${res.status}`);
	}

	const json = await res.json();
	// Több koordináta esetén tömb, egy koordináta esetén objektum jön vissza.
	const arr: Forecast[] = Array.isArray(json) ? json : [json];

	const result: Record<string, Forecast> = {};
	PLACES.forEach((p, i) => {
		if (arr[i]) result[p.id] = arr[i];
	});
	return result;
}

// Egy adott naphoz tartozó napi összegzés kinyerése.
export type DailySummary = {
	code: number;
	tMax: number;
	tMin: number;
	feelsMax: number;
	feelsMin: number;
	sunrise: string;
	sunset: string;
	uvMax: number;
	precipSum: number;
	precipProbMax: number;
	windMax: number;
};

export function daySummary(
	forecast: Forecast | undefined,
	date: string,
): DailySummary | null {
	if (!forecast) return null;
	const i = forecast.daily.time.indexOf(date);
	if (i === -1) return null;
	const d = forecast.daily;
	return {
		code: d.weather_code[i],
		tMax: d.temperature_2m_max[i],
		tMin: d.temperature_2m_min[i],
		feelsMax: d.apparent_temperature_max[i],
		feelsMin: d.apparent_temperature_min[i],
		sunrise: d.sunrise[i],
		sunset: d.sunset[i],
		uvMax: d.uv_index_max[i],
		precipSum: d.precipitation_sum[i],
		precipProbMax: d.precipitation_probability_max[i],
		windMax: d.wind_speed_10m_max[i],
	};
}

export type HourRow = {
	time: string;
	temp: number;
	feels: number;
	humidity: number;
	precipProb: number;
	precip: number;
	code: number;
	wind: number;
	gust: number;
	uv: number;
	cloud: number;
};

export function dayHours(
	forecast: Forecast | undefined,
	date: string,
): HourRow[] {
	if (!forecast) return [];
	const h = forecast.hourly;
	const rows: HourRow[] = [];
	h.time.forEach((t, i) => {
		if (t.startsWith(date)) {
			rows.push({
				time: t,
				temp: h.temperature_2m[i],
				feels: h.apparent_temperature[i],
				humidity: h.relative_humidity_2m[i],
				precipProb: h.precipitation_probability[i],
				precip: h.precipitation[i],
				code: h.weather_code[i],
				wind: h.wind_speed_10m[i],
				gust: h.wind_gusts_10m[i],
				uv: h.uv_index[i],
				cloud: h.cloud_cover[i],
			});
		}
	});
	return rows;
}
