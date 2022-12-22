package com.scottquach.pushupcounter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.scottquach.pushupcounter.plugins.ProximitySensor.ProximitySensorPlugin;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(ProximitySensorPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
