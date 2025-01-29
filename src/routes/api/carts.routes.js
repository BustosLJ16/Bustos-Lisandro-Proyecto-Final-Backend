import Router from 'express'

const router = Router();

router.get('/', (req, res) => {
    res.send('Hola estas en Carts')
})

export default router