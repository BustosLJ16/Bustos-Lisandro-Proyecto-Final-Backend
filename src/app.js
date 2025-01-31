// Importaciones de Dependencias
import express from 'express';
import handlebars from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as SocketIo } from 'socket.io';
import viewsRouter from './routes/views.routes.js'; // Router de las Views
import connectDB from './config/index.js'; // LLamada a la función que conecta con Mongoose

// Configuración del Servidor
const app = express();
const PORT = 8080 || process.env.PORT;
const httpServer = new HttpServer(app);
const io = new SocketIo(httpServer);

// Midlewares de Express
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


// Configuración de Handlebars
// Registrar helpers personalizados
const hbsHelper = {
    multiply: (a, b) => a * b,
};
app.engine('hbs', handlebars.engine({
    extname: ".hbs",
    helpers: hbsHelper,
    runtimeOptions: { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true },}
));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use('/', viewsRouter); // LLamada a la Rutas de ViewRouter
connectDB() // Ejecución de la función que conecta con Mongoose


// Escucha del Servidor
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchado en el puerto ${PORT}.`);
});