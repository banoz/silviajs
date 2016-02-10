/*
 * Non-volatile storage
 */

#ifndef __STORAGE_H__
#define __STORAGE_H__

#include <stdint.h>

class Storage {
  public:
    void read();

    double getTargetTemperature();
    double getKp();
    double getKi();
    double getKo();
    double getiTermSaturation();
    double getIntegralErrorBand();
    double getSleep();
    double getTwakeup();

    void setTargetTemperature(double value);
    void setKp(double value);
    void setKi(double value);
    void setKo(double value);
    void setiTermSaturation(double value);
    void setIntegralErrorBand(double value);
    void setSleep(double value);
    void setTwakeup(double value);

  private:

    void migrate();

    uint32_t getVersion();
    void setVersion(uint32_t value);

    void save();

    /* This struct must not be re-ordered since it is the EEPROM layout.
     * Elements must not be deleted.
     * To remove an element, replace the name by _unused1/2/3.
     * Elements must only be added at the end.
     */
    struct Data {
      uint32_t Version;

      double TargetTemperature;
      double Kp;
      double Ki;
      double Ko;
      double iTermSaturation;
      double IntegralErrorBand;
      double Sleep;
      double Twakeup;
    } data;

    static const uint16_t eepromOffset;
    static const Data DEFAULT_DATA;
};

#endif // __STORAGE_H__
