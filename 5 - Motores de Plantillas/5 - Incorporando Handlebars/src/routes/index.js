const {Router} = require ('express')
const router = Router()
const {getHome, getProducts, addProducts} = require ('../controllers/productsControllers')

router.get('/', getHome)

router.get('/productos', getProducts)
router.post('/productos', addProducts)

module.exports = router