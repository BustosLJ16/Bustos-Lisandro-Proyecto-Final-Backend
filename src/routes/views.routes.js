import { Router } from "express";
import productsRouter from './api/products.routes.js';
import cartsRouter from './api/carts.routes.js'
import realtimeproductsRouter from './realTimeProducts.routes.js'
import productModel from "../models/products.models.js";
import cartsModel from "../models/carts.models.js";


const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit = 10, numPage = 1, category, sort } = req.query;
        
        // Filtro Por categoría
        let filter = {};
        if (category) {
            filter.category = category; 
        }

        // Configurar de ordenamiento
        let sortOptions = {};
        if (sort === 'asc') {
            sortOptions.price = 1;
        } else if (sort === 'desc') {
            sortOptions.price = -1;
        }

        // Paso mis datos con Paginate
        const {
            docs,
            page,
            totalPages,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        } = await productModel.paginate(filter, { 
            limit, 
            lean: true, 
            page: numPage, 
            sort: sortOptions 
        });

        res.render('home', { 
            title: 'Home',
            products: docs,
            hasNextPage,
            hasPrevPage,
            totalPages,
            prevPage,
            nextPage,
            page
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});


router.get('/products', async (req, res) => {
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
    res.render('products', {title: 'Products',
        products: docs,
        hasNextPage,
        hasPrevPage,
        totalPages,
        prevPage,
        nextPage,
        page
    });
});

router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsModel.findById(cid).populate("products.product").lean();

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const cartTotal = cart.products.reduce((total, item) => total + item.quantity * item.product.price, 0);

        res.render("carts", { cart, cartTotal });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


// LLamo a los Routers y defino las Rutas
router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/realtimeproducts', realtimeproductsRouter);

export default router;