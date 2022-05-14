const mongoose = require("mongoose");
const config = require("../next.config")

const dbConnect = async () => {
    let connection = mongoose.connection.readyState;
    
    if (connection === 0){
        await mongoose.connect(config.env.mongoDB_URI) 
        .then(() => console.log('MongoDB Connected Successfully'))
        .catch((err) => console.error('Not Connected'));
    }else if (connection===1){
        console.log("MongoDB already connected")
    }
    
}

module.exports = dbConnect
