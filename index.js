var LineByLineReader = require("line-by-line");
var lr = new LineByLineReader("valhalla.log");
var fs = require("fs");
var ejs = require("ejs");
var allGraphData = { diagnostic: {}, boundary: {}, guidance: {}, angles: {} };

var diagnosticPattern = /\[valhalla_route_calculation_.*_boundary\] Valhalla Diagnostic/g;
var boundaryPattern = /\[.*_boundary] Routing\)/g;
var guidancePattern = /\[.*_boundary\] Guidance\)/g;
var anglesPattern = /\[.*_boundary\] Angles\)/g;

//Generate graph data and write to html
const genGraph = graph => {
	fs.readFile("./report.ejs", "utf8", function(err, contents) {
		var html = ejs.render(contents, { graph: graph });
		//console.log(html);

		fs.writeFile("./report.html", html, err => {
			if (err) throw err;
			console.log("The file has been saved!");
		});
	});
};

const line2Obj = line => {
	return line.split(" | ").reduce((result, section, index) => {
		let temp = section.split(":");
		if (index == 0) {
			//use 'name' as the key for the 1st item
			result["name"] = isNaN(parseFloat(temp[1]))
				? temp[1].trim()
				: parseFloat(temp[1]);
		} else {
			result[temp[0].trim()] = isNaN(parseFloat(temp[1]))
				? temp[1].trim()
				: parseFloat(temp[1]);
		}
		return result;
	}, {});
};

lr.on("error", function(err) {
	// 'err' contains error object
});

//process each line
//convert each line into proper object and then store it in allGraphData
lr.on("line", function(line) {
	if (anglesPattern.test(line)) {
		//convert each line to an object
		let obj = line2Obj(line);

		//assign "name" = "Mismatch pct" e.g. "jordan_boundary" = 9.41
		allGraphData["angles"][obj.name] = obj["Mismatch pct"];


	} else if (diagnosticPattern.test(line)) {
		//convert each line to an object
		let obj = line2Obj(line);

		//TODO - map values


	} else if (boundaryPattern.test(line)) {
		//convert each line to an object
		let obj = line2Obj(line);

		//TODO - map values


	} else if (guidancePattern.test(line)) {
		//convert each line to an object
		let obj = line2Obj(line);

		//TODO - map values
		
	}
});

lr.on("end", function() {
	var anglesGraphData = {
		labels: Object.keys(allGraphData.angles).map(x =>
			x.replace("_boundary", "")
		),
		data: Object.values(allGraphData.angles),
		title: "% Mismatch (Angles)",
		backgroundColor: [
			...new Array(Object.keys(allGraphData.angles).length)
		].map(x => "rgba(255, 99, 132, 0.2)")
	};
	genGraph(anglesGraphData);
	// All lines are read, file is closed now.
});
