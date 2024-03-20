export function fmtMSS(s) {
	let minutes = s % 60;
	let hours = (s - minutes) / 60;
	let result = "";
	if (hours > 0) {
		result += hours + "h ";
	}
	if (minutes > 0) {
		result += minutes + "m";
	}
	return result.trim();
}
