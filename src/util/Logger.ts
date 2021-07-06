import { BackTracker } from "backtracker";

const workerNameMaxLogLength = 10;
const scopeNameMaxLogLength = 15;

function stringify(data: any) {
	if (typeof data === "object" && data !== null && !Array.isArray(data)) {
		const references = new Set<any>();
		return JSON.stringify(step(data, references));
	} else if (Array.isArray(data)) return `[${data.map(i => stringify(i)).join(",")}]`;
	else return String(data);
}

function step(object: any, references: Set<any>): any {
	const rebuilt = {};
	for (const key of Object.keys(object)) {
		if (typeof object[key] === "object" && object[key] !== null && !Array.isArray(object[key])) {
			if (references.has(object[key])) rebuilt[key] = "[Circular]";
			else {
				references.add(object[key]);
				rebuilt[key] = step(object[key], references);
			}
		} else if (Array.isArray(object[key])) return `[${object[key].map(i => stringify(i)).join(",")}]`;
		else rebuilt[key] = object[key];
	}

	return rebuilt;
}

const logger = {
	post: (error: boolean, value: string) => {
		error ? console.error(value) : console.log(value);
	},
	getPrefix: (type: "warn" | "info" | "error", worker: string) => {
		const scope = BackTracker.stack[1].filename;
		const color = type === "warn" ? "\x1b[93m" : type === "error" ? "\x1b[91m" : "\x1b[92m";
		return `\x1b[90m${new Date().toISOString().replace("T", " ").replace("Z", "")} ${color}${type.toUpperCase()} \x1b[35m${process.pid} \x1b[0m--- [${" ".repeat(workerNameMaxLogLength - worker.length)}${worker}] \x1b[36m${scope}${" ".repeat(scopeNameMaxLogLength - scope.length)}\x1b[0m :`;
	},
	warn: (message: any, worker = "main") => {
		logger.post(false, `${logger.getPrefix("warn", worker)} ${stringify(message)}`);
	},
	info: (message: any, worker = "main") => {
		logger.post(false, `${logger.getPrefix("info", worker)} ${stringify(message)}`);
	},
	error: (message: any, worker = "main") => {
		logger.post(true, `${logger.getPrefix("error", worker)} ${stringify(message)}`);
	}
};

export = logger;
