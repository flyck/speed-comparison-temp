console.log("Hello via Bun!");

const data = {
	data: [
		{
			__name__: "deployment",
			region: "us-east-1",
			stage: "prod",
			status: "success",
			branch: "main",
		},
		{
			__name__: "deployment",
			region: "us-east-1",
			stage: "test",
			status: "success",
			branch: "main",
		},
		{
			__name__: "deployment",
			region: "us-east-1",
			stage: "dev",
			status: "success",
			branch: "main",
		},
	],
};

function setApproach() {
	const labelsSet = new Set<string>();
	for (const variant of data.data) {
		for (const key of Object.keys(variant)) {
			// if (key !== "__name__") {
			if (key !== "__name__" && !labelsSet.has(key)) {
				labelsSet.add(key);
			}
		}
	}
	return Array.from(labelsSet);
}

function constApproach() {
	const labels: string[] = [];

	for (const variant of data.data) {
		for (const key of Object.keys(variant)) {
			if (key !== "__name__" && !labels.includes(key)) {
				labels.push(key);
			}
		}
	}

	return labels;
}

function main() {
	const original = [...data.data];
	for (let i = 0; i < 1000; i++) {
		data.data = data.data.concat(original);
	}
	console.log(data.data.length);

	console.log("Starting");

	let startB = new Date().getTime();
	for (let i = 0; i < 10000; i++) {
		constApproach();
	}
	let endB = new Date().getTime();
	console.log("Speed in ms const approach:", { diff: endB - startB });

	let start = new Date().getTime();
	for (let i = 0; i < 10000; i++) {
		setApproach();
	}
	let end = new Date().getTime();
	console.log("Speed in ms setApproach:", { diff: end - start });
}

main();
