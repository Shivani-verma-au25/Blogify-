import dotenv from "dotenv";
dotenv.config()
import { app } from "./app.js";
import connectToDatabse from "./src/db/database.js";



connectToDatabse().then(() =>{
    app.listen(process.env.PORT || 4000 , () => {
        console.log(`Server is Running  on http://localhost:${process.env.PORT} `);
    })
}).catch((err) => {
    console.log("Error while starting the server" , err);    
})
