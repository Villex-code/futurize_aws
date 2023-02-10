var XLSX = require("xlsx");

// This is for XLSX

export const xlsToJson = (file) => {
  // read the contents of the file
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    // parse the file into a workbook
    const workbook = XLSX.read(data, { type: "binary" });
    // get the first sheet
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // convert the sheet to JSON
    const json = XLSX.utils.sheet_to_json(sheet);
    // do something with the JSON data
    console.log("This is my json", json);
  };
  reader.readAsBinaryString(file);
};

export function csvToJson(file) {
  try {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      var csv = reader.result;
      var csvLines = csv.split("\n");
      var headers = csvLines[0].split(",");
      var json = [];
      for (var i = 1; i < csvLines.length; i++) {
        var data = csvLines[i].split(",");
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = data[j].trim();
        }
        json.push(obj);
      }
      console.log(json);
    };
  } catch (e) {
    console.error(e);
  }
}

export function handleFile(file) {
  if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
    xlsToJson(file);
  } else if (file.name.endsWith(".csv")) {
    csvToJson(file);
  } else {
    console.log("Not a valid file format");
  }
}
