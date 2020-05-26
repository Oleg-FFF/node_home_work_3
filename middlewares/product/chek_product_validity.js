module.exports = async (req, res, next) => {
    console.log(req.body);
    try {
        const productFunc = require('../../services/product.service')
        const {id, type, brand, price} = req.body;
        const allProducts = await productFunc.getAllProducts();
        const productIndex = allProducts.findIndex( el => el.id === id );

        console.log('______________________________________');
        console.log(id, type, brand, price, productIndex);
        console.log('______________________________________');


        if (!id || !type || !brand || !price) {
            throw new Error('Product is not valid')
        }

        if (price <= 0 || price > 10000) {
            throw new Error('Price is not valid')
        }

        if (brand.length < 2) {
            throw new Error('Brand is not valid')
        }

        if (productIndex >= 0) {
            throw new Error('Product already exist')
        }

        next();

    } catch (Error) {
        res.json(Error.toString())
    }
}
