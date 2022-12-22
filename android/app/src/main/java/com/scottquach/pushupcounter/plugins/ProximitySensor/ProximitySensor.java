package com.scottquach.pushupcounter.plugins.ProximitySensor;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.List;
import java.util.logging.Logger;

import io.reactivex.rxjava3.subjects.PublishSubject;

public class ProximitySensor  implements SensorEventListener {
    private SensorManager sensorManager;
    private Sensor proximity;
    private float lastDistance;
    public PublishSubject<Float> observable = PublishSubject.create();

    public ProximitySensor(AppCompatActivity activity) {
        sensorManager = (SensorManager) activity.getSystemService(Context.SENSOR_SERVICE);
        proximity = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);

        Log.i("test", proximity.toString());
        if (proximity == null) {
            Toast.makeText(activity.getApplicationContext(), "No sensor found on device", Toast.LENGTH_LONG);
        } else {
//            boolean result = sensorManager.registerListener(this, proximity, SensorManager.SENSOR_DELAY_NORMAL);
//            Log.i("test", String.valueOf(result));

        }
        Log.i("test", "INIT");
    }

    public void registerListener() {
        boolean result = sensorManager.registerListener(this, proximity, SensorManager.SENSOR_DELAY_NORMAL);
        Log.i("test", String.valueOf(result));

    }

    public void removeListener() {
        Log.i("test", "Remove listener");
        sensorManager.unregisterListener(this);
    }

    public float getLastDistance() {
        Log.i("test","last distance");
        return this.lastDistance;
    }

    @Override
    public final void onAccuracyChanged(Sensor sensor, int accuracy) {
        // Do something here if sensor accuracy changes.
        Log.i("t", "accuracy changed");
    }

    @Override
    public final void onSensorChanged(SensorEvent event) {
//        Log.i("test", event.toString());
//        Log.i("test", event.values.toString());
//        Log.i("test", String.valueOf(event.values[0]));


        float distance = event.values[0];
        this.lastDistance = distance;
        // Do something with this sensor data.
        observable.onNext(this.lastDistance);
    }
}
