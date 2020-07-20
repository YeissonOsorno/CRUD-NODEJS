'use strict';
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();

/* Settings */
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routes */
app.use(require('./routes/index'));
app.use('/api',require('./routes/task.routes'));

/* Static Files */
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'))
});