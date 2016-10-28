const express = require('express');
const compression = require('compression');
const app = express();

app.use(compression());
app.use(express.static(__dirname + '/build'));

app.listen(process.env.PORT || 3000);
