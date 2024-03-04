import app from "./app.js";
import connectDB from "./config/ConnectionDB.js";

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`Listening at http://localhost:${process.env.PORT}`)
})