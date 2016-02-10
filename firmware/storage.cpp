/*
 * Non-volatile storage for hour meter
 */

#include "storage.h"
#include "helpers.h"
#include "application.h"

const uint16_t Storage::eepromOffset = 0;

const Storage::Data Storage::DEFAULT_DATA = {
  /* Version */ 1,
  /* TargetTemperature */ 96.0,
  /* Kp                */ 2.0,
  /* Ki                */ 0.01,
  /* Ko                */ 6.0,
  /* iTermSaturation   */ 10.0,
  /* IntegralErrorBand */ 10.0,
  /* Sleep             */ 0.0,
  /* Twakeup           */ 1436005800.0, /* 6:30am EST */
};

void Storage::read() {
  EEPROM.get(eepromOffset, data);
  migrate();
}

void Storage::migrate() {
  const unsigned int data_size = sizeof(Storage::Data);

  while(getVersion() != DEFAULT_DATA.Version) {
    switch(getVersion()) {
      case 0:
        /* Sleep and Twakeup added */
        data.Sleep = DEFAULT_DATA.Sleep;
        data.Twakeup = DEFAULT_DATA.Twakeup;
        data.Version = 1;
        save();
        break;

      case 1:
        /* Current version */
        break;

      default:
        /* EEPROM was erased */
        memcpy(&data, &DEFAULT_DATA, sizeof(DEFAULT_DATA));
        save();
        break;
    }
  }
}

void Storage::save() {
  EEPROM.put(eepromOffset, data);
}

uint32_t Storage::getVersion() {
  return data.Version;
}

double Storage::getTargetTemperature() {
  return data.TargetTemperature;
}

double Storage::getKp() {
  return data.Kp;
}

double Storage::getKi() {
  return data.Ki;
}

double Storage::getKo() {
  return data.Ko;
}

double Storage::getiTermSaturation() {
  return data.iTermSaturation;
}

double Storage::getIntegralErrorBand() {
  return data.IntegralErrorBand;
}

double Storage::getSleep() {
  return data.Sleep;
}

double Storage::getTwakeup() {
  return data.Twakeup;
}

void Storage::setVersion(uint32_t value) {
  if(data.Version != value) {
    data.Version = value;
    save();
  }
}

void Storage::setTargetTemperature(double value) {
  if(data.TargetTemperature != value) {
    data.TargetTemperature = value;
    save();
  }
}

void Storage::setKp(double value) {
  if(data.Kp != value) {
    data.Kp = value;
    save();
  }
}

void Storage::setKi(double value) {
  if(data.Ki != value) {
    data.Ki = value;
    save();
  }
}

void Storage::setKo(double value) {
  if(data.Ko != value) {
    data.Ko = value;
    save();
  }
}

void Storage::setiTermSaturation(double value) {
  if(data.iTermSaturation != value) {
    data.iTermSaturation = value;
    save();
  }
}

void Storage::setIntegralErrorBand(double value) {
  if(data.IntegralErrorBand != value) {
    data.IntegralErrorBand = value;
    save();
  }
}

void Storage::setSleep(double value) {
  if(data.Sleep != value) {
    data.Sleep = value;
    save();
  }
}

void Storage::setTwakeup(double value) {
  if(data.Twakeup != value) {
    data.Twakeup = value;
    save();
  }
}
