import mongoose from "mongoose";

class MongoSingleton {
  static instance

  constructor() {
      this.connection = null
  }

  async connect () {
      if (!MongoSingleton.instance) {
          this.connection = await mongoose.connect(process.env.MONGO_URL, {
            dbName: "coderhouse-final",
          });
          console.log('DB Connected')
          MongoSingleton.instance = this
      }
      return MongoSingleton.instance
  }
}

export default MongoSingleton