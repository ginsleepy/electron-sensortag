// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var SensorTag = require('sensortag');

var $ = require('jquery');


var USE_READ = true;

var RANGE = 3;

var PERIOD = 100;

function sensorTagDisovered(sensorTag) {
  console.log('discovered: ' + sensorTag);

  sensorTag.once('disconnect', function() {
    console.log('disconnected');
  });

  sensorTag.connectAndSetUp(function(err) {
    // restart discovery
    SensorTag.discover(sensorTagDisovered);

    if (err) {
      console.log('error occurred on connect or set up!');
      return;
    }

    console.log('connected');

    sensorTag.enableAccelerometer(function(err){
        if (err) {
          console.log('error occurred on enableAccelerometer!');
          return;
        }
        sensorTag.readAccelerometer(function(error, x, y, z) {
          console.log(sensorTag.id);
          console.log('\tx = %d G', x.toFixed(1));
          console.log('\ty = %d G', y.toFixed(1));
          console.log('\tz = %d G', z.toFixed(1));
          // $('p').html(sensorTag.id)

        });
        sensorTag.on('accelerometerChange', function(x, y, z) {
          console.log(sensorTag.id)
          // if (Math.abs(x) > RANGE || Math.abs(y) > RANGE || Math.abs(z) > RANGE) {
            console.log('\tx = %d G', x.toFixed(1));
            console.log('\ty = %d G', y.toFixed(1));
            console.log('\tz = %d G', z.toFixed(1));
          // }
          // $('p').html(sensorTag.id)
        });
        sensorTag.setAccelerometerPeriod(PERIOD, function(error) {
          console.log('notifyAccelerometer');
          sensorTag.notifyAccelerometer(function(error) {
            if (error) {
              console.log(error)
            }
          });
        });
    });

    // do some stuff with the sensorTag ...
  });
}

// start discovery of a SensorTag
SensorTag.discover(sensorTagDisovered);
