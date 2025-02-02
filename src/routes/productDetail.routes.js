import Router from 'express';
import productModel from '../models/products.models.js'; // Asegúrate de que tu modelo esté importado correctamente

const router = Router();

// Ruta GET para obtener un solo producto por su ID
router.get('/product/:pid', async (req, res) => {
    try {
        const productId = req.params.pid; // Obtenemos el ID del producto desde :pid
        const product = await productModel.findById(productId); // Buscamos el producto por su ID
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('productDetail', {
            product
        }); // Renderizamos la vista singleProduct.hbs con el producto
    } catch (error) {
        res.status(500).send('Error al obtener el producto');
    }
});

export default router;