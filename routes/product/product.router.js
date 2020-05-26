const {Router} = require('express');

const productRouter = Router();

const {productController} = require('../../controllers');
const chekProductValidity = require('../../middlewares/product/chek_product_validity');


productRouter.post('/', chekProductValidity, productController.createProduct);

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.put('/:id', productController.updateProduct);

productRouter.delete('/:id', productController.deleteProduct);


module.exports = productRouter;
