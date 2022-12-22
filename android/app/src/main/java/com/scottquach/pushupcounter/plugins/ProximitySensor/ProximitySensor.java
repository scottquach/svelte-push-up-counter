package com.scottquach.pushupcounter.plugins.ProximitySensor;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import androidx.appcompat.app.AppCompatActivity;
import io.reactivex.rxjava3.subjects.PublishSubject;

public class ProximitySensor  implements SensorEventListener {
    private SensorManager sensorManager;
    private Sensor proximity;
    private float lastDistance;
    public PublishSubject<Float> observable = PublishSubject.create();

    private AppCompatActivity activity;
    public ProximitySensor(AppCompatActivity activity) {
        this.activity = activity;
        sensorManager = (SensorManager) activity.getSystemService(Context.SENSOR_SERVICE);
        proximity = sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY);
        sensorManager.registerListener(this, proximity, SensorManager.SENSOR_DELAY_NORMAL);
    }

    public float getLastDistance() {
        return this.lastDistance;
    }

    public boolean hasProximityChanged(int value) {
        if (lastDistance == value) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public final void onAccuracyChanged(Sensor sensor, int accuracy) {
        // Do something here if sensor accuracy changes.
    }

    @Override
    public final void onSensorChanged(SensorEvent event) {
        float distance = event.values[0];
        this.lastDistance = distance;
        // Do something with this sensor data.
        observable.onNext(this.lastDistance);
    }
}
