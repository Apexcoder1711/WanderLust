const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const initDb = async() =>{
    await Listing.deleteMany({}); //phle jo v existing data hai sbko htayenge
    initData.data = initData.data.map((obj) => ({...obj , owner : "69415b5021d11e524d72edd7"} )); //map function creates new array with changes
    await Listing.insertMany(initData.data); //initData ek object ka usme data ek key value hai jisme bhut sare data hai
    console.log("data was initiliaze");
}

initDb();