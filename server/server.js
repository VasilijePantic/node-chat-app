const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '../public'); 

app.use(express.static(publicPath));

var port = 3000 || process.env.PORT;








//===========================
app.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});
