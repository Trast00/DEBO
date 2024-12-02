import { getDb } from "../utils/database.js"

class AnalyticalData {
  constructor({id, source, eventType, eventDescription, user: {userId, userName}, data: {dataId, dataName}, date, other}) {
    this.id = id
    this.source = source
    this.eventType = eventType
    this.eventDescription = eventDescription
    this.user = {userId, userName}
    this.data = {dataId, dataName}
    this.date = date
    this.other = { ...other }; 
  }

  updateOther(newData) {
    this.other = { ...this.other, ...newData }; // Merge new data into existing `other`
  }

  save() {
    const db = getDb(); // Ensure this returns a valid database connection
    const { eventType, date, user, data, other } = this;
    const { userId } = user;
    const { dataId } = data;
    const { emailId } = other;
  
    // Return the promise chain
    return db.collection('analytical_data')
      .findOne({
        eventType,
        'user.userId': userId, // Query nested field explicitly
        'other.emailId': emailId, // Query nested field explicitly
        'data.dataId': dataId, // Query nested field explicitly
        date
      })
      .then(result => {
        if (!result) {
          // Data does not exist, insert it
          return db.collection('analytical_data').insertOne(this);
        } else {
          console.log("Data already exists, skipping insertion.");
          return { message: "Data already exists" };
        }
      })
      .catch(error => {
        console.error("Error saving analytical data:", error);
        throw error; // Ensure errors propagate properly
      });
  }
  

  static getAll() {
    const db = getDb()
    return db.collection('analytical_data').find().toArray()
  }

}

export default AnalyticalData