#include <jni.h>
#include <fstream>

extern "C" JNIEXPORT jlong JNICALL
Java_com_ampereeye_core_BatteryTruthPlugin_getRealCurrent(JNIEnv* env, jobject /* this */) {
    std::ifstream file("/sys/class/power_supply/battery/current_now");
    jlong current_microamps = 0;

    if (file.is_open()) {
        file >> current_microamps;
        file.close();
    }

    return current_microamps / 1000;
}
