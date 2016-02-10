#include "concurrent_hal.h"

class PeriodicWork
{
public:
    PeriodicWork(system_tick_t period_) 
        : period(period_), previousWake(0)
    {
    }

    void setPeriod(system_tick_t period_) {
        this->period = period;
    }

    void start() {
        if(previousWake == 0) {
            previousWake = millis();
        }
    }

    void end() {
        os_thread_delay_until(&previousWake, period);
    }

protected:
    system_tick_t period;
    system_tick_t previousWake;
};

