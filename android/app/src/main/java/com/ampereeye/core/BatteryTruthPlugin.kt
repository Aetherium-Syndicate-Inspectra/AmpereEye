package com.ampereeye.core

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "BatteryTruth")
class BatteryTruthPlugin : Plugin() {

    init {
        System.loadLibrary("native-lib")
    }

    private external fun getRealCurrent(): Long

    @PluginMethod
    fun getRealCurrentFlow(call: PluginCall) {
        val currentMa = getRealCurrent()

        val ret = JSObject()
        ret.put("current_ma", currentMa)

        call.resolve(ret)
    }
}
