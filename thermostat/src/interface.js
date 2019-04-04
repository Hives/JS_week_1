var thermostat = new Thermostat();

$(document).ready(function() {

    var energyUsage = function() {
        if(thermostat.currentEnergyUsage() === "low-usage") {
            $('#temperature').removeClass().addClass("low-usage");
        } else if(thermostat.currentEnergyUsage() === "medium-usage") {
            $('#temperature').removeClass().addClass("medium-usage");
        } else {
            $('#temperature').removeClass().addClass("high-usage");
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





})
