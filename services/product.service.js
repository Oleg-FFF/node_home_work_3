const {readFile, appendFile, unlink, truncate} = require('fs');
const path = require('path');

let allMyProducts = [
    {id:1,type:"phone",brand:"xiaomi",price:300},
    {id:2,type:"watch",brand:"apple",price:200}
]

const usersPath = path.join(process.cwd(), 'products.txt');
console.log(usersPath);

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
                console.log(products);
                resolve(products);
            })
        })
    }

    async getProduct(productId) {
        let allProducts = await this.getAllProducts();
        console.log(allProducts);
        let searchedProduct = allProducts.find( el => el.id === productId )
        console.log(searchedProduct);
        if (!!searchedProduct) {
            return searchedProduct
        } else {
            return 'No product found'
        }
    }

    async deleteProduct(productId) {
        let allProducts = await this.getAllProducts();
        console.log(allProducts);

        let productToDeletingIndex = allProducts.findIndex( el => el.id === productId )
        console.log(productToDeletingIndex);

        if (productToDeletingIndex >= 0) {
            allProducts.splice(productToDeletingIndex, 1)
            let newArr=allProducts
            console.log(newArr);
            truncate(usersPath, 0, () => (console.log('cleared')))
            return new Promise((resolve, reject) => {
                for (let prod of newArr) {
                    let prodToRewrite = JSON.stringify(prod)
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
