"use strict";
//import packages
//set path
var fs = require("fs");
var path = require("path");
var petPath = path.join(__dirname, "pets.json");

//get http package
//set port
var http = require("http");
var PORT = process.env.PORT || 8000;

//create server
//if get request
//read file
//if err
//respond w console error and code data
var server = http.createServer(function (req, res) {
  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile(petPath, "utf8", function (err, data) {
      if (err) {
        console.error("error at request");
        res.statusCode = 500;
        res.setHeader("Content-type", "text/plain");
        return res.end("Internal error");
      }

      res.statusCode = 200;
      res.setHeader("content-type", "application/json");
      res.end(data);
    });
  } else if (req.method === "GET" && req.url === "/pets/0") {
    fs.readFile(petPath, "utf8", function (err, data) {
      if (err) {
        console.error("error at request");
        res.statusCode = 500;
        res.setHeader("Content-type", "text/plain");
        return res.end("Internal error");
      }
      var pets = JSON.parse(data);
      var petsJSON = JSON.stringify(pets[0]);
      res.statusCode = 200;
      res.setHeader("content-type", "application/json");
      res.end(petsJSON);
    });
  } else if (req.method === "GET" && req.url === "/pets/1") {
    fs.readFile(petPath, "utf8", function (err, data) {
      if (err) {
        console.error("error at request");
        res.statusCode = 500;
        res.setHeader("Content-type", "text/plain");
        return res.end("Internal error");
      }
      var pets = JSON.parse(data);
      var petsJSON = JSON.stringify(pets[1]);
      res.statusCode = 200;
      res.setHeader("content-type", "application/json");
      res.end(petsJSON);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('content-type','text/plain');
    res.end('Not found');
  }
});
server.listen(PORT, function () {
  console.log("Listening on port", PORT);
});
