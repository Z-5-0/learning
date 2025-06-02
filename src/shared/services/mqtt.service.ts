import { Injectable } from '@angular/core';
// import { connect, MqttClient } from 'mqtt';
import mqtt from 'mqtt';

@Injectable({
    providedIn: 'root'
})
export class MqttService {
    private client: mqtt.MqttClient;
    private readonly topic = 'mqtt/Z-5-0';

    constructor() {
        // this.client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt', {        // második paraméterben lehet beeállításokat végrehajtai
        this.client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', {        // második paraméterben lehet beeállításokat végrehajtai
            keepalive: 10,      // így például 10 másodpercenként ellenőrizzük a kapcsolatot
        });

        this.client.on('connect', () => {
            // console.log('MQTT connected');
            this.client.subscribe(this.topic);
        });

        this.client.on('error', err => {
            // console.error('MQTT error', err);
        });
    }

    publishMessage(msg: string): void {
        // console.log(msg);
        this.client.publish(this.topic, msg);
    }

    onMessage(callback: (msg: string) => void) {
        this.client.on('message', (topic, payload) => {
          const message = payload.toString();
          callback(message);
        });
      }  
}
