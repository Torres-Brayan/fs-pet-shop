// require neccessary modules
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// create a var to port
const PORT = 8000;

// middle ware that allows us to parse request for body
app.use(express.json());

// create shortcut to path
const petPath = path.join(__dirname, "pets.json");

// returns data
app.get("/get", function (req, res, next) {
  fs.readFile(petPath, "utf8", function (err, data) {
    if (err) {
      next({ status: 500, message: "internal error" });
    }
    return res.send(data);
  });
});

// returns data at given index
app.get("/get/:index", function (req, res, next) {
  const index = req.params.index;
  fs.readFile(petPath, "utf8", function (err, data) {
    let ListData = JSON.parse(data);
    if (!ListData[index]) {
      next({ status: 400, message: "INPUT ERROR" });
    }
    return res.json(ListData[index]);
  });
});

// lets user post and returns post data
app.post("/post", function (req, res, next) {
  fs.readFile(petPath, "utf8", function (err, data) {
    if (err) {
      next({ status: 500, message: "internal error" });
    }
    let ListData = JSON.parse(data);
    const body = req.body;
    ListData.push(body);
    if (!body.age || !body.kind || !body.name) {
      return next({ status: 400, message: "INPUT ERROR" });
    }
    fs.writeFile(petPath, JSON.stringify(ListData), function (err) {
      if (err) {
        next({ status: 500, message: "internal error" });
      }
      return res.send(body);
    });
  });
});

// lets user update data at given index at returns input data
app.put("/put/:index", function (req, res, next) {
  const index = req.params.index;
  fs.readFile(petPath, "utf8", function (err, data) {
    if (err) {
      next({ status: 500, message: "internal error" });
    }
    let ListData = JSON.parse(data);
    let check = ListData[index];
    if (!check) {
      return next({ status: 400, message: "INPUT ERROR" });
    }
    const body = req.body;
    ListData[index] = body;
    if (!ListData || !body.age || !body.kind || !body.name || !index) {
        return next({ status: 400, message: "INPUT ERROR" });
      }
    fs.writeFile(petPath, JSON.stringify(ListData), function (err) {
      return res.send(body);
    });
  });
});

// lets user delete data at given index return deleted data
app.delete("/delete/:index", function (req, res, next) {
  const index = req.params.index;
  fs.readFile(petPath, "utf8", function (err, data) {
    if (err) {
      next({ status: 500, message: "internal error" });
    }
    let listData = JSON.parse(data);
    let temp1 = listData[index]
    let removed = listData.splice(index, 1);
    if (!index || !listData || !data || !temp1) {
      return next({ status: 400, message: "INPUT ERROR" });
    }
    fs.writeFile(petPath, JSON.stringify(listData), function (err) {
      return res.send(removed);
    });
  });
});

// err messenger
app.use(function (err, req, res, next) {
  res.set("Content-Type", "text/plain");
  res.status(err.status).json({ error: err });
});

// last error catcher
app.use(function (req, res, next) {
  res.set("Content-Type", "text/plain");
  res.status(404).send("Check your paths dude");
});

// add listener
app.listen(PORT, function () {
  console.log(`struck gold on ${PORT}`);
});
