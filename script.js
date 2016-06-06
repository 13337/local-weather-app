$(document).ready(function() {
  var unitSwitch = {
    unit: "imperial",
    unitSymbol: "F",

    metric: function() {
      if (this.unit == "imperial") {
        this.unit = "metric";
        this.unitSymbol = "C";
      }
    },

    imperial: function() {
      if (this.unit == "metric") {
        this.unit = "imperial";
        this.unitSymbol = "F";
      }
    }
  }

  var coords = {
    lat: null,
    lon: null
  }
  
  function getLocWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        coords.lat = position.coords.latitude;
        coords.lon = position.coords.longitude;
        
        var addy = "http://api.openweathermap.org/data/2.5/weather?units=" + unitSwitch.unit + "&lat=" + coords.lat + "&lon=" + coords.lon + "&appid=9719f4b154b00916e4b55d7037d6f73a";

        $.getJSON(addy).then( function(result) {
          var temp = JSON.stringify(result.main.temp);
          var weather = JSON.stringify(result.weather[0].description);
          var humidity = JSON.stringify(result.main.humidity);
          var city = JSON.stringify(result.name);
          var quoteRemover = (/\"/g);
          var icon = JSON.stringify(result.weather[0].icon).replace(quoteRemover, "");
          var deg = "°";
          $("#temp").html(Math.round(temp) + deg + unitSwitch.unitSymbol + "   ");
          $("#weather").html(weather.replace(quoteRemover, ""));
          $("#city").html(city.replace(quoteRemover, ""));
          $("#icon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png' width=100em>");
          $("#unitSel").html('<a id="fahr" href="#">F</a>/<a id="cels" href="#">C</a></span>');
          $("#humid").html("Humidity: " + humidity + "%");
          $('#cels').click(function() {
            unitSwitch.metric();
          })
          $('#fahr').click(function() {
            unitSwitch.imperial();
          })
        })
      })
    }
  }
  getLocWeather();
})