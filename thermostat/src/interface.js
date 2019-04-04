var thermostat = new Thermostat();

$(document).ready(function() {

    var energyUsage = function() {
        if(thermostat.currentEnergyUsage() === "low-usage") {
            $('#temperature').removeClass("low-usage medium-usage high-usage").addClass("low-usage");
        } else if(thermostat.currentEnergyUsage() === "medium-usage") {
            $('#temperature').removeClass("low-usage medium-usage high-usage").addClass("medium-usage");
        } else {
            $('#temperature').removeClass("low-usage medium-usage high-usage").addClass("high-usage");
        }
    };
    
    $('#up').click(function() {
        thermostat.up();
        $('#temperature').text(thermostat.temp);
        energyUsage();
    });

    $('#down').click(function() {
        thermostat.down();
        $('#temperature').text(thermostat.temp);
        energyUsage();
    });

    $('#switch').click(function() {
        thermostat.powerSavingSwitch();
        $('#status').text(function() {
            if (thermostat.powerSaving) {
                return "On";
            } else {
                return "Off";
            };
        });
    });

    $('#reset').click(function() {
        thermostat.reset();
        $('#temperature').text(thermostat.temp);
        energyUsage();
    });

    $('#weather').click(function() {
        var city, apiUrl; 

        city = $('#city-input').val();
        apiUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=12654cc2a5f2c7cca7411446d8b9ae72";

        $.get(apiUrl, function(weatherData) {
            var
                weather = weatherData,
                description = weather.weather[0].main + " (" + weather.weather[0].description + ")",
                temperature = weather.main.temp;

            
            $('#city').text(city);
            $('#weather-description').text(description);
            $('#city-temperature').text(temperature);
        }, "json");

    });

});