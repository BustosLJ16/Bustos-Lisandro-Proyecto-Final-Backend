import Router from 'express'
import productModel from '../../models/products.models.js';

const router = Router();

// router.get('/', (req, res) => {
//     res.send('Hola estas en Products')
// })

router.get('/', async (req, res) => { // Obtener Lista de Productos
    try {
        const { limit=10 } = req.query // Defino por defecto 10 productos para renderizarlos
        const {
            docs,
            page,
            totalPages,
            hasPrevPage,
            hasNextPage
        } = await productModel.paginate({}, {limit});
        res.send({status:'Sucess', payload: {docs}});
    } catch (error) {
        console.log(error);
    }
});

router.get('/:pid', async (req, res) => { // Buscar Producto Por ID
    try {
        const { pid } = req.params;
        const productById = await productModel.findById({_id: pid});
        res.send({status: 'Sucess', payload: productById});
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => { // Crear un Producto
    try {
        const { body } = req;
        const result = await productModel.create(body);

        res.send({status: 'Sucess', payload: result});
    } catch (error) {
        console.log(error);
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const { body } = req;
        const resultUpdated = await productModel.findByIdAndUpdate({_id: pid}, body, {new: true});
        res.send({status: 'Sucess', payload: resultUpdated })
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const resultDeleted = await productModel.findByIdAndDelete({_id: pid}, {new: true});
        res.send({status: 'Sucess', payload: resultDeleted});
    } catch (error) {
        console.log(error);
    }
});

export default router