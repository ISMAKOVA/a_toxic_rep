require('dotenv').config()
const express = require('express')
const config = require('config')
const bodyParser = require("body-parser");
const models = require('./models/models')
const sequalize = require('./db');
const fileUpload = require('express-fileupload')
const cors = require("cors");
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler)




// // simple route
// app.get("/", (req, res) => {
//     res.json({ message: "A_toxic!" });
// });

const start = async() =>{
    try {
        await sequalize.authenticate()
        await sequalize.sync()
        app.listen(PORT, ()=> console.log(`App has been started on port ${PORT}`))
    }   catch (e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}



start()
