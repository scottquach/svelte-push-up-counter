package com.scottquach.pushupcounter.plugins.ProximitySensor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.content.res.Configuration;
import android.util.Log;


@CapacitorPlugin(name = "ProximitySensor")
public class ProximitySensorPlugin extends Plugin {
    private ProximitySensor implementation;

    @Override
    public void load() {
        Log.i("t", "HELLO THERE");
        implementation = new ProximitySensor(getActivity());
        implementation.observable.subscribe(x -> {
            JSObject ret = new JSObject();
            ret.put("distance", implementation.getLastDistance());
            notifyListeners("proximitySensorChange", ret);
        });
    }

    @PluginMethod()
    public void startSensor(PluginCall call) {
        implementation.registerListener();
        call.resolve();
    }

    @PluginMethod()
    public void stopSensor(PluginCall call) {
        implementation.removeListener();
        call.resolve();
    }

   @PluginMethod()
    public void getLastDistance(PluginCall call) {
       JSObject ret = new JSObject();
       ret.put("distance", implementation.getLastDistance());
       call.resolve(ret);
   }
}
