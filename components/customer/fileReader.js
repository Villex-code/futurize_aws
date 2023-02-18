var XLSX = require("xlsx");

import PopUp from "./popUp";
// This is for XLSX

export const xlsToJson = (file, setJsonData) => {
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

    let count = 0;

    for (let i in json) {
      console.log("My ith json object is ", json[i]);
      json[i]["RowNumber"] = count++;
      if (json[i].hasOwnProperty("Check In")) {
        var serialNumber = json[i]["Check In"];
        var date = new Date((serialNumber - 25569) * 86400 * 1000); // Convert Excel serial number to JavaScript date object
        var formattedDate = date.toLocaleString();
        json[i]["Check In"] = formattedDate;
      }

      if (json[i].hasOwnProperty("Check Out")) {
        var serialNumber = json[i]["Check Out"];
        var date = new Date((serialNumber - 25569) * 86400 * 1000); // Convert Excel serial number to JavaScript date object
        var formattedDate = date.toLocaleString();
        json[i]["Check Out"] = formattedDate;
      }
    }

    setJsonData(json);
  };
  reader.readAsBinaryString(file);
};

export function csvToJson(file, setJsonData) {
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
      console.log("The csv json is", json);
      let count = 0;

      for (let i in json) {
        console.log("My ith json object is ", json[i]);
        json[i]["RowNumber"] = count++;
        if (json[i].hasOwnProperty("Check In")) {
          var serialNumber = json[i]["Check In"];
          var date = new Date((serialNumber - 25569) * 86400 * 1000); // Convert Excel serial number to JavaScript date object
          var formattedDate = date.toLocaleString();
          json[i]["Check In"] = formattedDate;
        }

        if (json[i].hasOwnProperty("Check Out")) {
          var serialNumber = json[i]["Check Out"];
          var date = new Date((serialNumber - 25569) * 86400 * 1000); // Convert Excel serial number to JavaScript date object
          var formattedDate = date.toLocaleString();
          json[i]["Check Out"] = formattedDate;
        }
      }
      setJsonData(json);
    };
  } catch (e) {
    console.error(e);
  }
}

export function handleFile(file, setJsonData) {
  if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
    xlsToJson(file, setJsonData);
  } else if (file.name.endsWith(".csv")) {
    csvToJson(file, setJsonData);
  } else {
    console.log("Not a valid file format");
  }
}
