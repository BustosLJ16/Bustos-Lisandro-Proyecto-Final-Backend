import Router from 'express'

const router = Router();

router.get('/', (req, res) => {
    res.send('Hola estas en Real Time Products')
})

export default router