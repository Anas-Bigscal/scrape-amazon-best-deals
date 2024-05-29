require("dotenv").config();
const {createServer} = require('http');
const {app} = require('./src/app');
const {connect, connection} = require('mongoose');

const connectDatabase = () =>{
    return connect("mongodb://127.0.0.1:27017/amazonDeal");
};

connection.on("connected", ()=>{
    console.log("Database Connected");
});


const port = parseInt(process.env.PORT);

connectDatabase()
    .then(() => {
        createServer(app).listen(port, () => {
            console.log(`Server running on ${port}`);
        });
    });


  