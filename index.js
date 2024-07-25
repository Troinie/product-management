const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
require('dotenv').config();

const database = require("./config/database");

const systemConfix = require("./config/system");

const route = require("./routes/client/index.route");

const routeAdmin = require("./routes/admin/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
    extended: false
}))

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
// dùng để cài pug 

// flash

app.use(cookieParser("nguyet"));
app.use(session({
    cookie: {
        maxAge: 60000
    }
}));
app.use(flash());


// tinyMCE

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// app locals variables: tạo biến toàn cục
app.locals.prefixAdmin = systemConfix.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})