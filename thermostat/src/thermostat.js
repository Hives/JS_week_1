function Thermostat(){
  this.temp = 20;
  this._minTemp = 10;
  this._maxTempPowerSavingOn = 25;
  this._maxTempPowerSavingOff = 32;
  this.powerSaving = true;
};

Thermostat.prototype.up = function() {
  if(this.powerSaving) {
    if (this.temp < this._maxTempPowerSavingOn) {
      this.temp += 1;
    }
  } else {
    if (this.temp < this._maxTempPowerSavingOff) {
      this.temp += 1;
    }
  }
};

Thermostat.prototype.down = function() {
  if (this.temp > this._minTemp) {
      this.temp -= 1;
  };
};

Thermostat.prototype.powerSavingSwitch = function() {
  this.powerSaving = !this.powerSaving;
};

Thermostat.prototype.reset = function () {
  this.temp = 20;
}

Thermostat.prototype.currentEnergyUsage = function() {
  if(this.temp < 18) {
    return "low-usage";
  } else if(this.temp >= 18 && this.temp < 25) {
    return "medium-usage";
  } else {
    return "high-usage";
  };
};
