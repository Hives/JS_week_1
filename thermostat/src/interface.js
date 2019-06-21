var thermostat = new Thermostat();

$(document).ready(function() {

    var sendStuffToTheServer = function() {
        var apiUrl, city, temp, psm;
        
        apiUrl = "http://localhost:9292/thermostat";
        city = $('#city-input').val();
        temp = thermostat.temp;
        psm = thermostat.powerSaving;

        $.post(apiUrl, { 'city': city, 'temp': temp, 'powersaving': psm }, function(data){
            console.log(data);
        });

    }

    var getStuffFromServer = function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:9292/thermostat',
            dataType: 'json',
            success: function(data){
                console.log(data);
                console.log(data.city)
                $("#city-input").val(data.city);
                thermostat.temp = parseInt(data.temp);
                $('#temperature').text(data.temp)
                thermostat.powerSaving = (data.powersaving === "true")
                $('#status').text(function(){
                    if (data.powersaving === "true") {
                        return "On"
                    } else {
                        return "Off"
                    }
                })
                energyUsage();
            }
        });    
    };

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

        sendStuffToTheServer();
    });

    $('#down').click(function() {
        thermostat.down();
        $('#temperature').text(thermostat.temp);
        energyUsage();
        
        sendStuffToTheServer();
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

        sendStuffToTheServer();
    });

    $('#reset').click(function() {
        thermostat.reset();
        $('#temperature').text(thermostat.temp);
        energyUsage();
        sendStuffToTheServer();
    });

    $('#weather').click(function() {
        var city, apiUrl; 

        sendStuffToTheServer();

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

    $('#send-to-api').click(function(){
        sendStuffToTheServer();
    })

    $('#get-from-api').click(function(){
        console.log('you clicked #get-from-api');
        getStuffFromServer();
    });

    getStuffFromServer();

});