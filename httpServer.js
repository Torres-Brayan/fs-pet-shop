"use strict";

const fs = require("fs");
const path = require("path");
const petPath = path.join(__dirname, "pets.json");
const express = require("express");
const app = express();

app.get("/pets", function (req, res, next) {
  fs.readFile(petPath, "utf8", function (err, data) {
    if (err) {
        res.set("Content-Type", "text/plain");
        next({status : 500, message : 'Something went wrong'});
    }
    let petData = JSON.parse(data);
    res.status(200).send(petData);
  });
});

app.get("/pets/:id", function (req, res, next) {
  const id = req.params.id;
  fs.readFile(petPath, "utf8", function (err, data) {
    if (err) {
        res.set("Content-Type", "text/plain");
        next({status : 500, message : 'Something went wrong'});
    }
    let petData = JSON.parse(data);
    if (!petData[id]) {
        res.set("Content-Type", "text/plain");
        next({status : 404, message : 'bad address'});
    }
    res.status(200).json(petData[id]);
  });
});

app.use(express.json());


app.post("/pets", function (req, res, next) {
  const data = req.body;
  if (!data.name || !data.kind || !data.age) {
    res.set("Content-Type", "text/plain");
        next({status : 404, message : 'Bad Parameters'});
  }
  fs.readFile(petPath, "utf8", function (err, arr) {
      var newArr = JSON.parse(arr);
      newArr.push(data);
    fs.writeFile(petPath, JSON.stringify(newArr), function (err) {
      if (err) {
        res.set("Content-Type", "text/plain");
        next({status : 400, message : 'Bad Request'});
      }
    });
  });
  return res.status(200).send(data);
});
app.get('/boom', (req, res, next) => {
    next({ error: 'yooyuy!' })
  })

  app.use((err, req, res, next) => {
    res.set("Content-Type", "text/plain");
    res.status(500).json(err)
  })
app.get('/test-error', function(req, res, next) {
    const error = new Error('simulated error');
    next(error);
})

// app.use(function(err, req, res, next) {
//     res.set("Content-Type", "text/plain");
//     res.status(err.status).json({error : err});

// });


// app.use(function(req, res, next) {
//     res.set("Content-Type", "text/plain");
//     res.status(404).send('you suck idiot')
// });

// {error : {message: 'server sucks'}}
// {error : {message: 'you suck'}}
app.listen(8000, function () {
  console.log("listening bb");
});


