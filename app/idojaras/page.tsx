"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
	Sun,
	CloudSun,
	Cloud,
	Cloudy,
	CloudFog,
	CloudDrizzle,
	CloudRain,
	CloudRainWind,
	CloudSnow,
	CloudLightning,
	Droplets,
	Wind,
	Sunrise,
	Sunset,
	Thermometer,
	Umbrella,
	Gauge,
	MapPin,
	CloudCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	DAYS,
	PLACES,
	daySummary,
	dayHours,
	fetchAllForecasts,
	weatherInfo,
	type Forecast,
	type WeatherIconKey,
	type HourRow,
} from "./weather-config";

const ICONS: Record<WeatherIconKey, React.ComponentType<{ className?: string }>> =
	{
		sun: Sun,
		"cloud-sun": CloudSun,
		cloud: Cloud,
		cloudy: Cloudy,
		fog: CloudFog,
		drizzle: CloudDrizzle,
		rain: CloudRain,
		"rain-wind": CloudRainWind,
		snow: CloudSnow,
		thunder: CloudLightning,
	};

function WeatherIcon({
	code,
	className,
}: {
	code: number | undefined;
	className?: string;
}) {
	const Icon = ICONS[weatherInfo(code).icon];
	return <Icon className={className} />;
}

function hhmm(iso: string) {
	// "2026-09-15T14:00" -> "14:00"
	const t = iso.split("T")[1] ?? "";
	return t.slice(0, 5);
}

function round(n: number | undefined) {
	return n === undefined ? "–" : Math.round(n).toString();
}

export default function IdojarasPage() {
	const [forecasts, setForecasts] = useState<Record<string, Forecast>>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeDay, setActiveDay] = useState(0);

	useEffect(() => {
		let cancelled = false;
		fetchAllForecasts()
			.then((data) => {
				if (!cancelled) setForecasts(data);
			})
			.catch((e) => {
				if (!cancelled) setError(e.message ?? "Ismeretlen hiba");
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	const day = DAYS[activeDay];
	const places = useMemo(
		() => day.placeIds.map((id) => PLACES.find((p) => p.id === id)!),
		[day],
	);

	return (
		<div className="flex min-h-screen flex-col items-center justify-start bg-background px-4 sm:px-8 lg:px-20 pt-20 sm:pt-24 lg:pt-30 w-full">
			<div className="flex flex-col items-start justify-start gap-6 w-full max-w-4xl pb-16">
				{/* Fejléc */}
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
						Időjárás – Olaszország
					</h1>
					<p className="text-sm text-muted-foreground max-w-prose">
						Óránkénti előrejelzés az utazás napjaira. Válassz egy napot a
						fülekből: minden fül a napi átlagot mutatja, kattints rá az órás
						bontásért. Adatforrás:{" "}
						<a
							href="https://open-meteo.com"
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4 hover:text-foreground">
							Open-Meteo
						</a>
						.
					</p>
				</div>

				{loading && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground py-10">
						<CloudCog className="w-4 h-4 animate-spin" />
						Előrejelzés betöltése…
					</div>
				)}

				{error && !loading && (
					<div className="rounded-xl border border-destructive/40 bg-destructive/10 text-destructive px-4 py-3 text-sm">
						Nem sikerült betölteni az időjárást: {error}
					</div>
				)}

				{!loading && !error && (
					<>
						{/* Tab fülek – mindegyik a napi átlagot mutatja */}
						<div className="flex gap-2 w-full overflow-x-auto pb-2 -mb-2">
							{DAYS.map((d, i) => {
								// A fül összegzéséhez az első helyszín napi adatát vesszük.
								const primary = daySummary(
									forecasts[d.placeIds[0]],
									d.date,
								);
								const active = i === activeDay;
								return (
									<button
										key={d.date + i}
										onClick={() => setActiveDay(i)}
										className={cn(
											"flex flex-col items-start gap-1 rounded-xl border px-3 py-2.5 shrink-0 min-w-[7.5rem] text-left transition-colors",
											active
												? "border-primary bg-primary/5 ring-1 ring-primary/40"
												: "bg-card hover:bg-accent/50",
										)}>
										<span className="text-xs font-medium text-muted-foreground">
											{d.label}
										</span>
										<span className="text-sm font-semibold leading-tight">
											{d.title}
										</span>
										<div className="flex items-center gap-1.5 mt-0.5">
											<WeatherIcon
												code={primary?.code}
												className="w-5 h-5 text-foreground/80"
											/>
											{primary ? (
												<span className="text-sm">
													<span className="font-semibold">
														{round(primary.tMax)}°
													</span>
													<span className="text-muted-foreground">
														{" / "}
														{round(primary.tMin)}°
													</span>
												</span>
											) : (
												<span className="text-xs text-muted-foreground">
													n/a
												</span>
											)}
										</div>
									</button>
								);
							})}
						</div>

						{/* Kiválasztott nap részletei */}
						<div className="flex flex-col gap-6 w-full">
							{places.map((place) => {
								const fc = forecasts[place.id];
								const summary = daySummary(fc, day.date);
								const hours = dayHours(fc, day.date);
								return (
									<PlaceCard
										key={place.id}
										name={place.name}
										summary={summary}
										hours={hours}
									/>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

function PlaceCard({
	name,
	summary,
	hours,
}: {
	name: string;
	summary: ReturnType<typeof daySummary>;
	hours: HourRow[];
}) {
	if (!summary) {
		return (
			<div className="rounded-xl border bg-card p-5">
				<div className="flex items-center gap-2 font-semibold">
					<MapPin className="w-4 h-4" />
					{name}
				</div>
				<p className="text-sm text-muted-foreground mt-2">
					Erre a napra nincs elérhető előrejelzés.
				</p>
			</div>
		);
	}

	const info = weatherInfo(summary.code);

	return (
		<div className="rounded-xl border bg-card overflow-hidden">
			{/* Napi összegzés */}
			<div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
				<div className="flex items-center gap-4 min-w-0 sm:w-64">
					<WeatherIcon
						code={summary.code}
						className="w-12 h-12 shrink-0 text-foreground/90"
					/>
					<div className="min-w-0">
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4 shrink-0 text-muted-foreground" />
							<h2 className="text-lg font-semibold truncate">{name}</h2>
						</div>
						<p className="text-sm text-muted-foreground">{info.label}</p>
						<div className="flex items-baseline gap-2 mt-1">
							<span className="text-2xl font-bold">
								{round(summary.tMax)}°
							</span>
							<span className="text-muted-foreground">
								/ {round(summary.tMin)}°
							</span>
						</div>
					</div>
				</div>

				{/* Extra napi információk */}
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 text-sm flex-1">
					<Stat
						icon={Thermometer}
						label="Hőérzet"
						value={`${round(summary.feelsMax)}° / ${round(summary.feelsMin)}°`}
					/>
					<Stat
						icon={Umbrella}
						label="Csapadék esély"
						value={`${round(summary.precipProbMax)}%`}
					/>
					<Stat
						icon={Droplets}
						label="Csapadék"
						value={`${summary.precipSum.toFixed(1)} mm`}
					/>
					<Stat
						icon={Wind}
						label="Szél (max)"
						value={`${round(summary.windMax)} km/h`}
					/>
					<Stat icon={Gauge} label="UV (max)" value={round(summary.uvMax)} />
					<Stat
						icon={Sunrise}
						label="Napkelte"
						value={hhmm(summary.sunrise)}
					/>
					<Stat icon={Sunset} label="Napnyugta" value={hhmm(summary.sunset)} />
				</div>
			</div>

			{/* Órás bontás */}
			<div className="border-t">
				<div className="flex items-center justify-between px-5 pt-3">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						Órás előrejelzés
					</span>
					<Badge variant="secondary">{hours.length} óra</Badge>
				</div>
				<div className="flex gap-2 overflow-x-auto p-5 pt-3">
					{hours.map((h) => (
						<HourCell key={h.time} h={h} />
					))}
				</div>
			</div>
		</div>
	);
}

function Stat({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-2">
			<Icon className="w-4 h-4 shrink-0 text-muted-foreground" />
			<div className="min-w-0">
				<div className="text-xs text-muted-foreground leading-none">
					{label}
				</div>
				<div className="font-medium leading-tight">{value}</div>
			</div>
		</div>
	);
}

function HourCell({ h }: { h: HourRow }) {
	return (
		<div className="flex flex-col items-center gap-1.5 rounded-lg border bg-background px-3 py-3 shrink-0 w-20">
			<span className="text-xs font-medium text-muted-foreground">
				{hhmm(h.time)}
			</span>
			<WeatherIcon code={h.code} className="w-6 h-6 text-foreground/90" />
			<span className="text-sm font-semibold">{round(h.temp)}°</span>
			<span className="text-[11px] text-muted-foreground leading-none">
				{round(h.feels)}° hőérzet
			</span>
			<div className="flex items-center gap-0.5 text-[11px] text-blue-500 dark:text-blue-400">
				<Droplets className="w-3 h-3" />
				{round(h.precipProb)}%
			</div>
			<div className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
				<Wind className="w-3 h-3" />
				{round(h.wind)}
			</div>
		</div>
	);
}
