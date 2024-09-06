require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser')

const corsOptions = {
    origin: ['http://127.0.0.1:5500','http://localhost:5500', 'http://localhost:8080', 'http://127.0.0.1:8088'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'accept', 'X-API-KEY', 'X-Requested-With', 'X-Custom-Header'],
    credentials: true,
    optionsSuccessStatus: 204
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

// API routers
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const viaCepRouter = require('./routes/viacep');

const PORT = process.env.PORT || 5000;

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

// API
app.use(usersRouter);
app.use(loginRouter);
app.use(viaCepRouter);