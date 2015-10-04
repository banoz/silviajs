export default {
  variablesToApp: function(data) {
    return {
      temperature: data.temp,
      power: data.dc,
      error: data.e,
      sleeping: data.s === 1,
      iPart: data.i,
      pPart: data.p
    };
  },
  calibrationsToApp: function(data) {
    return {
      targetTemperature: data.sp,
      proportional: data.Kp,
      integral: data.Ki,
      offset: data.Ko
    };
  },
  calibrationFirmwareName: function(name) {
    return {
      targetTemperature: "sp",
      proportional: "Kp",
      integral: "Ki",
      offset: "Ko",
      wakeupTime: "Twakeup",
      sleeping: "sleep"
    }[name];
  }
};
