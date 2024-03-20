export function getColor(value) {
	const colors = [
		{ val: 0, color: "red" },
		{ val: 30, color: "orange" },
		{ val: 60, color: "yellow" },
		{ val: 75, color: "#21d07a" },
	];

	let colorToUse = colors[0].color;

	for (let i = 0; i < colors.length; i++) {
		if (value < colors[i].val) {
			break;
		}
		colorToUse = colors[i].color;
	}

	return colorToUse;
}

