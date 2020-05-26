module.exports = (req, res, next) => {
    console.log(req.body);
    try {
        const {id, type, brand, price} = req.body;
        console.log('______________________________________');
        console.log(id, type, brand, price);
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

        next();

    } catch (e) {
        res.end(e)
    }
}
