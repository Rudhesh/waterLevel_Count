import db from "../config/db.js";

export default class SensorWaterDepth {
  constructor(
    id,
    sensorName,
    sensorLength,
    sensorCount,
    timestamp,
    sensorCountId
  ) {
    this.id = id;
    this.sensorName = sensorName;
    this.sensorCount = sensorCount;
    this.sensorLength = sensorLength;
    this.sensorCountId = 728;
    this.waterDepth = sensorLength * sensorCount;
    this.timestamp = timestamp;
  }

  /* Database model to save data related to water depth.
    This includes the sensor id, sensor name, waterDepth,
    and the timestamp of the recorded waterDepth value . 
    The waterDepth calue is calculated in controllers by multiplying
    sensor count and sensor length values. */
  saveWaterDepth() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let ss = d.getSeconds();
    let min = d.getMinutes();
    let hh = d.getHours();

    let timestampDate = `${yyyy}-${mm}-${dd}-${hh}-${min}-${ss}`;

    // inserting sensor count data to the table waterDepth
    let sql = `
        INSERT INTO waterdepth(
            sensorId,
            waterDepth,
            sensorCountId,
            timestamp
        )
        VALUES(
            '${this.id}',
            '${this.waterDepth}',
            '${this.sensorCountId}',
            '${timestampDate}'
        )
        `;
    console.log(this.sensorCount);
    return db.execute(sql);
  }

  // function to find all datas realted to waterDepth for all sensor
  static findAll() {
    let sql = "SELECT * FROM waterdepth;";
    return db.execute(sql);
  }

  // function to find datas realted to sensorCount for specific sensor id
  static findByID(id) {
    let sql = `SELECT * FROM waterdepth WHERE sensorId = ${id};`;
    return db.execute(sql);
  }
}
