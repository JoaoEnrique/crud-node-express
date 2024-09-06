require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

app.use(cors())

app.use(cookieParser());
app.use(express.json());

// Views routers
const loginViewsRouter = require('./routes/views/public/login');
const usersViewsRouter = require('./routes/views/authenticated/users');

const PORT = process.env.PORT || 8080;

// Configuração do handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "layouts") 

}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

// Servindo arquivos estáticos
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));

// Inicialização do servidor
app.listen(PORT, () => {
    console.log('Servidor Ligado');
    console.log('http://localhost:' + PORT);
})

// Views
app.use(loginViewsRouter);
app.use(usersViewsRouter);