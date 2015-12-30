#!/bin/sh
curl -X POST -d '{"deviceNum":"1", "command":"off"}' -i http://linaro-alip:4444/device/control
