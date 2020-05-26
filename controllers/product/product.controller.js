const {productService} = require('../../services/index')

module.exports = {
    getAllProducts: async (req, res) => {
        let products = await productService.getAllProducts();
        res.json({products});
    },

    getProduct: async (req, res) => {
        const params = +req.params.id;

        let product = await productService.getProduct(params);

        res.json({product})
    },

    updateProduct: (req, res) => {
        res.end('PUT product')
    },

    deleteProduct: async (req, res) => {
        const params = +req.params.id;
        let delProd = await productService.deleteProduct(params)
        res.json({delProd})
    },

    createProduct: async (req, res) => {
        console.log(req.body)
        await productService.createProduct(req.body);
        res.end('Post product')
    }
};
