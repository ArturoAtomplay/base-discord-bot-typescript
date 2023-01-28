import * as fs from "fs";

export default function readDirectory(
	directory: string,
	jsOnly: boolean = false,
): string[] {
	let files = fs.readdirSync(directory);

	if (jsOnly)
		files = files.filter(
			(file) => file.endsWith(".js") || file.endsWith(".ts"),
		);

	return files;
}
