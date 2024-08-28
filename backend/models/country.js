import { getDb } from "../utils/database.js";

class Country {
    constructor(id, name, description, flagUrl, language) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.flagUrl = flagUrl;
        this.language = language;
    }

    static getAll = () => {
      const db = getDb()
      return db.collection('countries').find().toArray()
    }
}

export default Country