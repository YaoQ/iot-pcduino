#!/usr/bin/env python
import paho.mqtt.client as mqtt
import json
import gpio
dev1_pin = "gpio19"
dev2_pin = "gpio18"
ip_address= "192.168.1.106"

def setup():
    gpio.pinMode(dev1_pin, gpio.OUTPUT)
    gpio.digitalWrite(dev1_pin, gpio.LOW)

def destroy():
    gpio.digitalWrite(dev1_pin,gpio.LOW)

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("device/control")

def on_message(client, userdata, msg):
    gpio_msc = str(msg.payload)
    print(msg.topic+" "+gpio_msc)
    
    if gpio_msc == 'dev1-on':
        gpio.digitalWrite(dev1_pin, gpio.HIGH)
    elif gpio_msc == 'dev1-off':
        gpio.digitalWrite(dev1_pin, gpio.LOW)
    elif gpio_msc == 'dev2-on':
	gpio.digitalWrite(dev2_pin, gpio.HIGH)
    elif gpio_msc == 'dev2-off': 
        gpio.digitalWrite(dev2_pin, gpio.LOW)

   

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
setup()

try:
    client.connect("192.168.1.106", 1883, 60)
    client.loop_forever()

except KeyboardInterrupt:
    client.disconnect()
    destroy()

