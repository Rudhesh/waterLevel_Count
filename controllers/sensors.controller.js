import schedule from "node-schedule";
import Sensor from "../models/sensor.js";
import SensorCount from "../models/sensorCount.js";
import SensorWaterDepth from "../models/sensorWaterDepth.js";

// returns all existing sensors
export const getSensors = async (req, res, next) => {
  try {
    const [sensors, _] = await Sensor.findAll();
    res.status(200).json({ sensors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/* creates a new sensor with the sensorName, sensorLength, latitude,
and longitude and retuens new sensor created message */
export const createSensor = async (req, res, next) => {
  try {
    let { sensorName, sensorLength, latitude, longitude } = req.body;
    console.log(sensorName);
    let sensor = new Sensor(sensorName, sensorLength, latitude, longitude);
    sensor = await sensor.saveSensor();
    console.log({ sensor });
    console.log(`Sensor [${sensor.latitude}] added to the database.`);
    res.status(201).json({ message: "New sensor created" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/* returns specific sensor according to id */
export const getSensor = async (req, res, next) => {
  try {
    let sensorId = req.params.id;
    let [sensor, _] = await Sensor.findByID(sensorId);
    console.log({ sensor });

    res.status(200).json({ sensor: sensor });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*export const deleteSensor = (req, res) => { 
    sensors = sensors.filter((sensor) => sensor.id !== req.params.id);
    console.log(`Sensor with id ${req.params.id} has been deleted`); 
    res.send(`Sensor with id ${req.params.id} has been deleted`);
};
*/
/* generates random sensor count value ranging between 0 to 1023 */
const getSensorCount = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

/* Function to create a virtual sensor that sends sensor count value very 5 minutes
and saves sensor count and water depth values respectively*/
const virtualSensor = async () => {
  const [sensors, _] = await Sensor.findAll();
  console.log("first", sensors);
  // sensorsWithSensorCount =
  schedule.scheduleJob("*/1 * * * *", () => {
    console.log("second", sensors.sensorName);
    sensors.forEach((elem) => {
      elem.sensorCount = getSensorCount(0, 1023);
      console.log(elem.sensorCount);
      elem.timeStamp = Date.now();
      let sensorCount = new SensorCount(
        elem.sensorId,
        elem.sensorName,
        elem.sensorLength,
        elem.sensorCount
      );
      let waterDepth = new SensorWaterDepth(
        elem.sensorId,
        elem.sensorName,
        elem.sensorLength,
        elem.sensorCount
      );
      sensorCount = sensorCount.saveSensorCount();
      waterDepth = waterDepth.saveWaterDepth();
    });
  });
};

// returns sensorCounts data for all sensors
export const getSensorCounts = async (req, res, next) => {
  try {
    const [sensors, _] = await SensorCount.findAll();
    res.status(200).json({ sensors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// returns sensorCounts data specific to sensor id
export const getSensorCountsById = async (req, res, next) => {
  try {
    let sensorId = req.params.id;
    let [sensor, _] = await SensorCount.findByID(sensorId);
    res.status(200).json({ sensor: sensor });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// returns all waterDepths data
export const getWaterDepths = async (req, res, next) => {
  try {
    const [sensors, _] = await SensorWaterDepth.findAll();
    res.status(200).json({ sensors });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// returns waterDepths data specific to sensor id
export const getWaterDepthsById = async (req, res, next) => {
  try {
    let sensorId = req.params.id;
    let [sensor, _] = await SensorWaterDepth.findByID(sensorId);
    res.status(200).json({ sensor: sensor });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default virtualSensor;
