const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection'); 
dotenv.config();
const errorhandler = require('./middleware/errorhandler');

const app = express();
const port = process.env.PORT || 5000;

connectDB();


app.use(express.json());

app.use("/api/contacts", require('./routes/contactRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use(errorhandler);

app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
