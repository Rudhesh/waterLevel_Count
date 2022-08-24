import db from "../config/db.js";
import { v4 as uuid } from "uuid";

export default class Sensor {
  constructor(sensorName, sensorLength, latitude, longitude) {
    this.sensorName = sensorName;
    this.sensorLength = sensorLength;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  // database model to saveSensor
  saveSensor() {
    /*let d = new Date();
        let yyyy = d.detFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAtDate = */

    let id = uuid();

    // inserting a new sensor data to the table sensors
    let sql = `
        INSERT INTO sensors(
            sensorName,
            sensorLength,
            latitude,
            longitude
        )
        VALUES(
            '${this.sensorName}',
            '${this.sensorLength}',
            '${this.latitude}',
            '${this.longitude}'
        )
        `;

    return db.execute(sql);
  }

  // function to find all existing sensors
  static findAll() {
    let sql = "SELECT * FROM sensors;";
    return db.execute(sql);
  }

  //finction to find specific sensor by id
  static findByID(id) {
    let sql = `SELECT * FROM sensors WHERE sensorId = ${id};`;
    return db.execute(sql);
  }
}
