console.log("Hello")

const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const request = require("request");
const port=process.env.PORT || 8000;
////////////////////////////////////////////////////////public set
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

//////////////////////////////////////////////////////////hbs
app.set("view engine", "hbs");
const views_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");
app.set("views", views_path);
hbs.registerPartials(partials_path);

////////////////////////////////routing
app.get("/weather", (req, res) => {
  // res.render("index");

  let cityName = req.query.address;

  geocode(cityName, (err, result) => {
    if (err) res.send("Error occured");
    else {
      getWeather(result.lat, result.lon, (err, data) => {
        if (err) res.send("Error occured");
        else res.send(data);
      });
    }
  });
});
//////////////////////////////////////////
app.get("", (req, res) => {
  res.render("index");
})
///////////////////////////////////////////port
app.listen(port, () => {
  console.log("Server Is Running");
});

////////////////////////////////////////////
const geocode = (cityName, callback) => {
  console.log(cityName)
  const geocode_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=30cce5c549c5ecc9d89993f2aee6a2a7`;

  request({ url: geocode_url, json: true }, (error, res) => {
    if (!error) {
      console.log(res.body)
      const lat = res.body[0].lat;
      const lon = res.body[0].lon;
      callback(undefined, { "lat": lat, "lon": lon });
    } else {
      callback({ error: "City not found" }, undefined);
    }
  });
};

const getWeather = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=30cce5c549c5ecc9d89993f2aee6a2a7`;

  request({ url: url, json: true }, (error, res) => {
    if (error) {
      callback("Error", undefined);
    } else {
      callback(undefined, {
        data:  {"temp":res.body.main.temp,
        "min":res.body.main.temp_min,
        "max":res.body.main.temp_max} ,
      });
    }
  });
};
