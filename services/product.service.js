const {readFile, appendFile, truncate} = require('fs');
const path = require('path');

const usersPath = path.join(process.cwd(), 'products.txt');

class ProductService {

    getAllProducts() {
        let products = [];

        return new Promise((resolve, reject) => {
            readFile(usersPath, (error, JSONProducts) => {

                if (error) {
                    reject('Cant read file')
                }

                let JSONArr = JSONProducts.toString().split('\n');

                JSONArr.forEach(jsonProduct => {
                    if (!jsonProduct) {
                        return
                    }

                    products.push(JSON.parse(jsonProduct))
                })
                resolve(products);
            })
        })
    }

    async getProduct(productId) {

        const allProducts = await this.getAllProducts();

        const searchedProduct = allProducts.find( el => el.id === productId )

        if (!!searchedProduct) {
            return searchedProduct
        } else {
            return 'No product found'
        }
    }

    async deleteProduct(productId) {

        let allProducts = await this.getAllProducts();

        const productToDeletingIndex = allProducts.findIndex( el => el.id === productId )

        if (productToDeletingIndex >= 0) {
            allProducts.splice(productToDeletingIndex, 1)

            const newArr=allProducts

            truncate(usersPath, 0, () => (console.log('cleared')));

            return new Promise((resolve, reject) => {
                for (const prod of newArr) {

                    const prodToRewrite = JSON.stringify(prod)

                    appendFile(usersPath, `\n${prodToRewrite}`, (err) => {

                        if (err) {
                            reject('Cant delete product')
                        }
                        resolve('Product deleted')
                    })
                }
            })
        } else {
            return 'No product found'
        }
    }


    createProduct(product){

        const productToPush = JSON.stringify(product);

        return new Promise((resolve, reject) => {
            appendFile(usersPath, `\n${productToPush}`, (err) => {
                if (err) {
                    reject('Cant write product')
                }
                resolve()
            })
        })
    }
}

module.exports = new ProductService;
