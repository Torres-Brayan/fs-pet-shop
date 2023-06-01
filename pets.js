var fs = require("fs");
const { argv } = require("node:process");

function weRead() {
  let index = argv[3];
  fs.readFile("./pets.json", "utf8", function (error, data) {
    let obj1 = JSON.parse(data);
    if (error) {
      console.log(error);
    } else if (!index) {
      console.log(data);
    } else {
      if (!obj1[index]) {
        console.error("Usage: node pets.js read INDEX");
      } else {
        console.log(obj1[index]);
      }
    }
  });
}

function weCreate() {
  let age = argv[3];
  let kind1 = argv[4];
  let name1 = argv[5];
  let obj1 = {};
  let numAge = parseInt(age);
  Object.assign(obj1, { age: numAge }, { kind: kind1 }, { name: name1 });
  fs.readFile("./pets.json", "utf8", function (error, data) {
    let array1 = JSON.parse(data);
    if (!age || !kind1 || !name1) {
      console.error("Usage: node pets.js create AGE KIND NAME");
    } else {
      array1.push(obj1);
      fs.writeFile("./pets.json", JSON.stringify(array1), function (error) {
        if (error) {
          console.error("Usage: node pets.js create AGE KIND NAME");
        } else {
          fs.readFile("./pets.json", "utf8", function (error, data) {
            if (error) {
              console.log(error);
            } else {
              console.log(obj1);
            }
          });
        }
      });
    }
  });
}

function weUpdate() {
  let index = argv[3];
  let age = argv[4];
  let kind1 = argv[5];
  let name1 = argv[6];
  age = parseInt(age);
  if (!index || !age || !kind1 || !name1) {
    console.error("Usage: node pets.js update INDEX AGE KIND NAME");
  } else {
    fs.readFile("./pets.json", "utf8", function (error, data) {
      if (error) {
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
      }
      var petData = JSON.parse(data);
      var dataPets = petData[index];
      dataPets.age = age;
      dataPets.kind = kind1;
      dataPets.name = name1;
      fs.writeFile("./pets.json", JSON.stringify(petData), function (error) {
        if (error) {
          console.error("Usage: node pets.js update INDEX AGE KIND NAME");
        } else {
          console.log(dataPets);
        }
      });
    });
  }
}

let command = argv[2];

if (command === "read") {
  weRead();
} else if (command === "create") {
  weCreate();
} else if (command === "update") {
  weUpdate();
} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
}
