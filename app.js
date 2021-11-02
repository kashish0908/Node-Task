const path = require("path");
const port = 5000;
const fs = require("fs");
const fsPromise = require("fs").promises;

const express = require("express");
const bodyParser = require("body-parser");

const { check, validationResult } = require("express-validator");
const { parse } = require("path");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// const urlencodedParser = bodyParser.urlencoded({extended: true})

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/event", (req, res) => {
  res.render("event");
});

//---------Dashboard---------

app.get("/dashboard", function (req, res) {
  // Your logic and then redirect
  fs.readFile("./products.json", (err, data) => {
    res.render("dashboard", {
      key: JSON.parse(data),
    });
  });
});

app.post("/register", async (req, res) => {
  var data = req.body;

  const json = await fsPromise.readFile("./products.json", "utf8");

  const myJson = json ? JSON.parse(json) : [];

  const myData = [...myJson, data];

  const words = JSON.stringify(myData, null, 2);

  fs.writeFile("products.json", words, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("written successful");
      res.redirect("/dashboard");
      console.log();
    }
  });
});
//---------EVENT---------

app.get("/dashboardevent", function (req, res) {
  // Your logic and then redirect
  fs.readFile("./event.json", (err, data) => {
    res.render("dashboardevent", {
      key1: JSON.parse(data),
    });
  });
});

app.post("/event", async (req, res) => {
  var data1 = req.body;

  const json1 = await fsPromise.readFile("./event.json", "utf8");

  const myJson1 = json1 ? JSON.parse(json1) : [];

  const myData1 = [...myJson1, data1];

  const words1 = JSON.stringify(myData1, null, 2);

  fs.writeFile("event.json", words1, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("written event successful");
      res.redirect("/dashboardevent");
      console.log();
    }
  });
});

//---------INDEX---------

app.get("/dashboardindex", function (req, res) {
  // Your logic and then redirect
  fs.readFile("./index.json", (err, data) => {
    res.render("dashboardindex", {
      key2: JSON.parse(data),
    });
  });
});

// app.post("/", async (req, res) => {
//     var data2 = req.body;
//     console.log(req.body)

//     fs.readFile("./products.json", (err, data) => {
//       const JsonData22 = JSON.parse(data);
//       console.log("JSON5", JsonData22);
//       const newJsonData5 = JsonData22.filter((data) =>
//         data.email.includes(data2.search)
//       );
//       console.log("NEWWWWWWWWW22", newJsonData5);
//       res.render("dashboardindex", {

//       });
//     });
//   });

app.post("/", async (req, res) => {
  var data2 = req.body;
  console.log(req.body.email);

  const json2 = await fsPromise.readFile("./products.json", "utf8");

  const myJson2 = json2 ? JSON.parse(json2) : [];

  const user = myJson2.find((data) => data.email === req.body.email && data.password === req.body.password);

  if (user) {
    res.redirect('/dashboard');
    return;
  } else {
    const myData2 = [...myJson2, data2];

    const words2 = JSON.stringify(myData2, null, 2);

    fs.writeFile("index.json", words2, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("written index successful");
        res.redirect("/register");
      }
    });
  }

  console.log("new", newJsonData22);
});

app.post("/dashboardevent", async (req, res) => {
  console.log("iknitiasl", req.body);
  const data3 = req.body;
  console.log(data3);
  fs.readFile("./event.json", (err, data) => {
    const JsonData = JSON.parse(data);
    console.log("data", data);
    console.log("JSON", JsonData);
    const newJsonData = JsonData.filter(
      (data) => data.title !== req.body.title
    );
    console.log("NEWWWWWWWWW", newJsonData);

    fs.writeFile("./event.json", JSON.stringify(newJsonData), () => {
      res.render("dashboardevent", {
        key1: newJsonData,
      });
    });
  });
});
//---------DELETE INDEX---------

app.post("/dashboard", async (req, res) => {
  console.log("iknitiasl1", req.body);
  const data4 = req.body;
  console.log(data4);
  fs.readFile("./products.json", (err, data) => {
    const JsonData4 = JSON.parse(data);
    // console.log("data",data);
    console.log("JSON4", JsonData4);
    const newJsonData4 = JsonData4.filter(
      (data) => data.email !== req.body.email
    );
    console.log("NEWWWWWWWWW4", newJsonData4);

    fs.writeFile("./products.json", JSON.stringify(newJsonData4), () => {
      res.render("dashboard", {
        key: newJsonData4,
      });
    });
  });
});

//--------- SEARCH---------
app.post("/search", (req, res) => {
  const data5 = req.body;
  console.log(data5);
  fs.readFile("./products.json", (err, data) => {
    const JsonData5 = JSON.parse(data);
    console.log("JSON5", JsonData5);
    const newJsonData5 = JsonData5.filter((data) =>
      data.email.includes(data5.search)
    );
    console.log("NEWWWWWWWWW5", newJsonData5);
    res.render("dashboard", {
      key: newJsonData5,
    });
  });
});

//--------- SEARCH-INDEX---------
app.post("/searchevent", (req, res) => {
  const data6 = req.body;
  console.log(data6);
  fs.readFile("./event.json", (err, data) => {
    const JsonData6 = JSON.parse(data);
    console.log("JSON6", JsonData6);
    const newJsonData6 = JsonData6.filter((data) =>
      data.title.includes(data6.search1)
    );
    console.log("NEWWWWWWWWW6", newJsonData6);
    res.render("dashboardevent", {
      key1: newJsonData6,
    });
  });
});

//-------PREPOPULATE-------

app.post("/edit", (req, res) => {
  const data7 = req.body;
  console.log(data7);
  fs.readFile("./products.json", (err, data) => {
    const JsonData7 = JSON.parse(data);
    console.log("Json7", JsonData7);
    const newJsonData7 = JsonData7.filter(
      (data) => data.username === req.body.username
    );
    console.log("NEWWWWWWWWW7", newJsonData7);
    res.render("edit", {
      key7: newJsonData7,
    });
  });
  const data8 = req.body;
  fs.readFile("./products.json", (err, data) => {
    const JsonData8 = JSON.parse(data);
    console.log("data", data);
    console.log("JSON7", JsonData8);
    const newJsonData8 = JsonData8.filter(
      (data) => data.username !== req.body.username
    );
    console.log("NEWWWWWWWWW8", newJsonData8);

    fs.writeFile("./products.json", JSON.stringify(newJsonData8), () => {
      res.render("edit", {
        key7: newJsonData8,
      });
    });
  });
});

//-------PREPOPULATE EVENT-------

app.post("/editevent", (req, res) => {
  const data9 = req.body;
  console.log(data9);
  fs.readFile("./event.json", (err, data) => {
    const JsonData9 = JSON.parse(data);
    console.log("Json9", JsonData9);
    const newJsonData9 = JsonData9.filter(
      (data) => data.description === req.body.description
    );
    console.log("NEWWWWWWWWW9", newJsonData9);
    res.render("editevent", {
      key9: newJsonData9,
    });
  });
  const data10 = req.body;
  fs.readFile("./event.json", (err, data) => {
    const JsonData10 = JSON.parse(data);
    console.log("data", data);
    console.log("JSON9", JsonData10);
    const newJsonData10 = JsonData10.filter(
      (data) => data.description !== req.body.description
    );
    console.log("NEWWWWWWWWW10", newJsonData10);

    fs.writeFile("./event.json", JSON.stringify(newJsonData10), () => {
      res.render("editevent", {
        key9: newJsonData10,
      });
    });
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
