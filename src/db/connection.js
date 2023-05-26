const mongoose = require("mongoose");

const db = process.env.DATABASE;

const connect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully.");
  } catch (error) {
    console.log(`Db connection failure ->`, error);
  }
};

connect();
