import express from "express";

const router = express.Router();

// Routes
/**
 * @swagger
 * /sensors:
 *  get:
 *    description: |
 *       Api endpoint to return the list of all existing sensors.
 *       Users can send a get request to "/sensors"
 *       The sensor information returned are as follows:
 *       a) sensorId: id of the sensor
 *       b) sensorName: name of the sensor
 *       c) sensorLength: length of sensor (i.e.if the sensor version which measures up to 10 metres is used then
 *                         sensor length is 10)  (Unit: metres)
 *       d) latitude: latitude of the instilled sensor
 *       e) longitude: longitude of the instilled sensor
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", getSensors);

/**
 * @swagger
 * /sensors:
 *  post:
 *    description: |
 *       Api endpoint to create a new sensor.
 *       Users can send a post request to "/sensors" with the following required information:
 *       a) sensorName: name of the sensor
 *       b) sensorLength: length of sensor (i.e.if the sensor version which measures up to 10 metres is used then
 *                         sensor length is 10) (Unit: metres)
 *       c) latitude: latitude of the instilled sensor
 *       d) longitude: longitude of the instilled sensor
 *    consumes:
 *       - application/json
 *    parameters:
 *       - in: body
 *         name: sensor
 *         description: Information about new sensor to create.
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *           properties:
 *             sensorName:
 *               type: string
 *             sensorLength:
 *               type: integer
 *           example:   # Sample object
 *             sensorName: 'NJS26'
 *             sensorLength: 10
 *             latitude: 23.4
 *             longitude: 45.6
 *    responses:
 *      '201':
 *        description: New sensor created
 */
router.post("/", createSensor);

/**
 * @swagger
 * /sensors/sensorCounts:
 *  get:
 *    description: |
 *       Api endpoint which returns sensor counts values of all the sensors.
 *       The sensor's PIN3 Analog Voltage Ouptut returns a value between 0 to 1023.
 *       This is the sensor count value. Internally a virtual sensor is implied
 *       which sends a count value between 0 to 1023 mocking the value that can be
 *       received from the sensor's PIN3 Analog voltage. This count value is currently
 *       sent every 5 minutes.
 *       The information received for sensorCount response are as follows:
 *       a) sensor_count_id: id for each of the recirded sensor count values
 *       b) sensorId: id of the sensor
 *       c) sensorName: name of the sensor
 *       d) sensorLength : length of sensor (i.e.if the sensor version which measures up to 10 metres is used then
 *                         sensor length is 10) (Unit: metres)
 *       e) sensorCount: value obtained from PIN3 Analog voltage (which ranges from 0 to 1023)
 *       f) timestamp: the timeperiod when the snesor count data is recorded
 *
 *       Users can send a get request to "/sensors/sensorCount"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/sensorCounts", getSensorCounts);

/**
 * @swagger
 * /sensors/waterDepths:
 *  get:
 *   description: |
 *       Api endpoint which returns waterDepth values of all the sensors.
 *       Water depth values are calculated by multiplying sensorCount and sensorLength values
 *       where: sensorCount= value obtained from PIN3 Analog voltage (which ranges from 0 to 1023)
 *       sensorLength= length of sensor (i.e.if the sensor version which measures up to 10 metres is used then
 *                     sensor length is 10) (Unit: metres)
 *                     waterDepth= distance of the sensor to the object i.e. (waterDepth = sensorCount * sensorLength) Units: mm
 *       The information received for waterDepth response are as follows:
 *       a) waterDepthId: id for each of the recirded sensor count values
 *       b) sensorId: id of the sensor
 *       c) sensorName: name of the sensor
 *       d) waterDepth : distance of the sensor to the object i.e. (waterDepth = sensorCount * sensorLength) Units: mm
 *       f) timestamp: the timeperiod for specific waterDepth data
 *
 *       Users can send a get request to "/sensors/waterDepths"
 *   responses:
 *      '200':
 *        description: A successful response
 */
router.get("/waterDepths", getWaterDepths);

/**
 * @swagger
 * /sensors/{id}:
 *  get:
 *    description: |
 *       Use to get sensor information for specific sensor id
 *       The sensor information returned for the requested sensor id are as follows:
 *       a) sensorId: id of the sensor
 *       b) sensorName: name of the sensor
 *       c) sensorLength: length of sensor (i.e.if the sensor version which measures up to 10 metres is used then
 *                         sensor length is 10)  (Unit: metres)
 *       d) latitude: latitude of the instilled sensor
 *       e) longitude: longitude of the instilled sensor
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Sensor ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/:id", getSensor);

/**
 * /sensors/{id}:
 *  delete:
 *    description: Use to delete a specific sensor
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Sensor ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *    responses:
 *      '200':
 *        description: A successful response
 */
//router.delete('/:id', deleteSensor);

/**
 * @swagger
 * /sensors/{id}/waterDepth:
 *  get:
 *    description: |
 *       Use to retrieve waterdepth values for specific sensor id.
 *       Users can send a get request to "/sensors/1/waterDepth"  where 1 is an example sensor id.
 *       Water depth values are calculated by multiplying sensorCount and sensorLength values
 *       where: sensorCount= value obtained from PIN3 Analog voltage (which ranges from 0 to 1023)
 *       sensorLength= length of sensor (i.e.if the sensor version which measures up to 10 metres is used then
 *                     sensor length is 10) (Unit: metres)
 *                     waterDepth= distance of the sensor to the object i.e. (waterDepth = sensorCount * sensorLength) Units: mm
 *       The information for waterDepth datas for the specified sensor are received as follows:
 *       a) waterDepthId: id for each of the recirded sensor count values
 *       b) sensorId: id of the sensor
 *       c) sensorName: name of the sensor
 *       d) waterDepth : distance of the sensor to the object i.e. (waterDepth = sensorCount * sensorLength) Units: mm
 *       f) timestamp: the timeperiod for specific waterDepth data
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Sensor ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/:id/waterDepth", getWaterDepthsById);

/**
 * @swagger
 * /sensors/{id}/sensorCount:
 *  get:
 *    description: |
 *       Use to retrieve data sensorCount values for specific sensor id.
 *       Users can send a get request to "/sensors/1/sensorCount"  where 1 is an example sensor id.
 *       The sensor's PIN3 Analog Voltage Ouptut returns a value between 0 to 1023.
 *       This is the sensor count value. Internally a virtual sensor is implied
 *       which sends a count value between 0 to 1023 mocking the value that can be
 *       received from the sensor's PIN3 Analog voltage. This count value is currently
 *       sent every 5 minutes.
 *        The information for sensorCount datas for the specified sensor are received as follows:
 *       a) sensor_count_id: id for each of the recirded sensor count values
 *       b) sensorId: id of the sensor
 *       c) sensorName: name of the sensor
 *       d) sensorLength : length of sensor (i.e.if the sensor version which measures up to 10 metres is used then
 *                         sensor length is 10) (Unit: metres)
 *       e) sensorCount: value obtained from PIN3 Analog voltage (which ranges from 0 to 1023)
 *       f) timestamp: the timeperiod when the snesor count data is recorded
 *
 *    parameters:
 *       - name: id
 *         in: path
 *         description: Sensor Id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/:id/sensorCount", getSensorCountsById);

export default router;
