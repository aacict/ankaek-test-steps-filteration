'use strict'
//Import the mongoose module
import mongoose from 'mongoose';

//Set up default mongoose connection
const mongoDB: string = `mongodb://localhost:27017/testdb`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

//Get the default connection
const db:any = mongoose['connection'];

//Bind connection to error event (to get notification of connection errors)
db.once('connected', async () => {  console.log("connection to database successful")});
db.on('error', async (err: any) => { 
  console.error("Error in mongodb connection: ", err);
  db.disconnect();
});

export {db, mongoose}