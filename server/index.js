const express = require('express');//Instance of express framework
const app = express();
const cors = require("cors");
const PORT = 3001;
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
res.json({message:'hello world'})
})

app.listen(PORT, () => {
    console.log("Server running");
})

