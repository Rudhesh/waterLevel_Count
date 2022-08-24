import db from "../config/db.js";

export default class SensorCount {
  constructor(id, sensorName, sensorLength, sensorCount, timestamp) {
    this.id = id;
    this.sensorName = sensorName;
    this.sensorLength = sensorLength;
    this.sensorCount = sensorCount;
    this.timestamp = timestamp;
  }

  /* Database model to save data related to sensor count.
    This includes the sensor id, sensor name, sensor length, sensor count,
    and the timestamp of the recorded sensorCount value */

  saveSensorCount() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let ss = d.getSeconds();
    let min = d.getMinutes();
    let hh = d.getHours();

    let timestampDate = `${yyyy}-${mm}-${dd}-${hh}-${min}-${ss}`;

    // inserting sensor count data to the table sensorCount
    let sql = `
        INSERT INTO sensorcount(
            sensorId,
            sensorCount,
            timestamp
        )
        VALUES(
            '${this.id}',
            '${this.sensorCount}',
            '${timestampDate}'
        )
        `;
    console.log(this.sensorCount);
    return db.execute(sql);
  }

  // function to find all datas realted to sensorCount for all sensor
  static findAll() {
    let sql = "SELECT * FROM sensorcount;";
    return db.execute(sql);
  }

  // function to find datas realted to sensorCount for specific sensor id
  static findByID(id) {
    let sql = `SELECT * FROM sensorcount WHERE sensorId = ${id};`;
    return db.execute(sql);
  }
}
