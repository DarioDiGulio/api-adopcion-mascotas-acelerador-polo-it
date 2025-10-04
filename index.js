const express = require('express');
const cors = require('cors');

const mascotaRouter = require('./router/mascota.Router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:3000"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // o el dominio exacto de tu HTML
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.use('/', mascotaRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});