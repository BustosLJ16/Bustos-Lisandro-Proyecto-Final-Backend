import { Router } from "express";

import productsRouter from './api/products.routes.js';
import cartsRouter from './api/carts.routes.js'
import realtimeproductsRouter from './realTimeProducts.routes.js'
import productModel from "../models/products.models.js";

const router = Router();

router.get('/', async (req, res) => {
    const { limit=10, numPage=1 } = req.query; // Defini por default el Limit en 10 y Pagina en 1.
    const {
        docs,
        page,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    } = await productModel.paginate({}, {limit, lean: true, page: numPage});

    res.render('home', {title: 'Home',
        products: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        page
    });
});


// LLamo a los Routers y defino las Rutas
router.use('/api/products', productsRouter);
router.use('/api/cart', cartsRouter);
router.use('/realtimeproducts', realtimeproductsRouter);

export default router;