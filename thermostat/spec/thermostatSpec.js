'use strict';

describe("Thermostat", function () {
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat ();
  });

  describe('power usage', function () {
    it("returns a low-usage if temp < 18", function () {
      thermostat.temp = 17;
      expect(thermostat.currentEnergyUsage()).toEqual("low-usage");
    });
  
    it("returns a medium-usage if temp < 25", function () {
      thermostat.temp = 24;
      expect(thermostat.currentEnergyUsage()).toEqual("medium-usage");
    });
  
    it("returns a high-usage if temp >= 25", function () {
      thermostat.temp = 27;
      expect(thermostat.currentEnergyUsage()).toEqual("high-usage");
    });
  });

  describe('temperature controls', function () {
    it('the temperature can be increased by 1 degree', function () {
      thermostat.up();
      expect(thermostat.temp).toEqual(21);
    });
  
    it('the temperature can be decreased by 1 degree', function () {
      thermostat.down();
      expect(thermostat.temp).toEqual(19);
    });  
  });

  describe('defaults', function () {
    it("returns a starting temperature of 20", function () {
      expect(thermostat.temp).toEqual(20);
    });
    
    it('the power saving mode is on by default', function () {
      expect(thermostat.powerSaving).toBe(true);
    });    
  });

  describe('power mode', function () {
    it('the power saving mode can be changed to off', function () {
      thermostat.powerSavingSwitch()
      expect(thermostat.powerSaving).toBe(false);
      thermostat.powerSavingSwitch()
      expect(thermostat.powerSaving).toBe(true);
    });
  
    it('if power saving mode is on, the maximum temperature is 25 degrees', function () {
      Array(20).fill().forEach(function () {
        thermostat.up();
      });
      expect(thermostat.temp).toEqual(25);
    });
  
    it('If power saving mode is off, the maximum temperature is 32 degrees', function () {
      thermostat.powerSavingSwitch()
      Array(20).fill().forEach(function () {
        thermostat.up();
      });
      expect(thermostat.temp).toEqual(32);
    });
  });

  it('the minimum temperature is 10 degrees', function () {
    Array(20).fill().forEach(function () {
      thermostat.down();
    });
    expect(thermostat.temp).toEqual(10);
  });

  describe('reset button', function () {
    it('resets temperature to 20', function () {
      Array(20).fill().forEach(function () {
        thermostat.up();
      });
      thermostat.reset();
      expect(thermostat.temp).toEqual(20);
    });  
  });
});
