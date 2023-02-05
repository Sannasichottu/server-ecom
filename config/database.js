const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const connectDatabase = () => {
    mongoose.connect(process.env.ATLAS_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=> {
        console.log("Database connect successfully")
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDatabase;