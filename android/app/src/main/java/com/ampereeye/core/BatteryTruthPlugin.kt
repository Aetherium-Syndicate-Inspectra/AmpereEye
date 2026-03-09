package com.ampereeye.core

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "BatteryTruth")
class BatteryTruthPlugin : Plugin() {

    private val nativeLoaded: Boolean by lazy {
        runCatching { System.loadLibrary("native-lib") }.isSuccess
    }

    private external fun getRealCurrent(): Long

    @PluginMethod
    fun getRealCurrentFlow(call: PluginCall) {
        if (!nativeLoaded) {
            call.unavailable("native-lib is not available on this build")
            return
        }

        val currentMa = getRealCurrent()
        val ret = JSObject()
        ret.put("current_ma", currentMa)
        call.resolve(ret)
    }
}
