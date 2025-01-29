import mongoose from 'mongoose';

// Configuración de Mongoose 
const connectDB = () => {
    console.log('La Base de Datos fue Conectada con Éxito.');
    mongoose.connect('mongodb+srv://bustoslj16:pSiq8BWP4mFS1qE3@coderhouse-backend-bust.dhmsr.mongodb.net/coderhouse-backend?retryWrites=true&w=majority&appName=CoderHouse-Backend-Bustos-Lisandro') // URI de Mongoose
}

export default connectDB;