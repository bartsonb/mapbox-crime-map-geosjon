const express = require('express');
var cors = require('cors')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.static(__dirname + '/public/'));
app.use('/api', require('./routes/api/geo'));

app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}.`);
});