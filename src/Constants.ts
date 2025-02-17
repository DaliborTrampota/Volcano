export const defaultOptions = {
	spring: {
		main: {
			"banner-mode": "log"
		}
	},
	server: {
		port: process.env.PORT || 2333,
		address: "0.0.0.0"
	},
	lavalink: {
		server: {
			password: "youshallnotpass",
			sources: {
				youtube: true,
				bandcamp: true,
				soundcloud: true,
				twitch: true,
				vimeo: true,
				http: false,
				local: false
			},
			bufferDurationMs: 400,
			youtubePlaylistLoadLimit: 6,
			playerUpdateInterval: 5,
			youtubeSearchEnabled: true,
			soundcloudSearchEnabled: true
		}
	},
	logging: {
		file: {
			"max-history": 30,
			"max-size": "1GB"
		},
		path: "./logs/",
		level: {
			root: "INFO",
			lavalink: "INFO"
		}
	}
};

export const baseHTTPResponseHeaders = {
	"Lavalink-Api-Version": 3
};

export const fakeAgent = `Mozilla/5.0 (Server; NodeJS ${process.version}; rv:1.0) Magma/1.0 (KHTML, like Gecko) Volcano/1.0`;

export const baseHTTPRequestHeaders = {
	"User-Agent": fakeAgent,
	"Accept-Language": "en-US,en;q=0.5",
	Connection: "keep-alive"
};

export const OPCodes = {
	VOICE_UPDATE: "voiceUpdate" as const,
	PLAY: "play" as const,
	STOP: "stop" as const,
	PAUSE: "pause" as const,
	SEEK: "seek" as const,
	FILTERS: "filters" as const,
	DESTROY: "destroy" as const,
	CONFIGURE_RESUMING: "configureResuming" as const,

	PLAYER_UPDATE: "playerUpdate" as const,
	STATS: "stats" as const,
	EVENT: "event" as const
};

export const defaultFilterValues: import("./types").PlayerFilterOptions = {
	volume: 1.0,
	equalizer: [
		{
			band: 0,
			gain: 0.2
		}
	],
	karaoke: {
		level: 1.0,
		monoLevel: 1.0,
		filterBand: 220.0,
		filterWidth: 100.0
	},
	timescale: {
		speed: 1.0,
		pitch: 1.0,
		rate: 1.0
	},
	tremolo: {
		frequency: 2.0,
		depth: 0.5
	},
	vibrato: {
		frequency: 2.0,
		depth: 0.5
	},
	rotation: {
		rotationHz: 0
	},
	distortion: {
		sinOffset: 0,
		sinScale: 1,
		cosOffset: 0,
		cosScale: 1,
		tanOffset: 0,
		tanScale: 1,
		offset: 0,
		scale: 1
	},
	channelMix: {
		leftToLeft: 1.0,
		leftToRight: 0.0,
		rightToLeft: 0.0,
		rightToRight: 1.0,
	},
	lowPass: {
		smoothing: 20.0
	}
};

export const workerOPCodes = {
	READY: 1 as const,
	MESSAGE: 2 as const,
	CLOSE: 3 as const,
	ACKKNOWLEDGE: 4 as const,
	REPLY: 5 as const,
	STATS: 6 as const,
	VOICE_SERVER: 7 as const,
	DELETE_ALL: 8 as const
};

export const OKStatusCodes = [200, 201, 204, 304];

export const baseSoundcloudURL = "https://soundcloud.com";

export default {
	defaultOptions,
	baseHTTPResponseHeaders,
	OPCodes,
	defaultFilterValues,
	workerOPCodes,
	baseHTTPRequestHeaders,
	OKStatusCodes,
	baseSoundcloudURL
};
