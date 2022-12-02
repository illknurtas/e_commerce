// Coffee : price_1M9yiSJlyqEYKjmZYp3mHQ1Q
// Tea : price_1M9yo7JlyqEYKjmZ1ihcuJbD
// Milk : price_1M9ypMJlyqEYKjmZisjS5y7g
const productsArray = [
    {
        id:'price_1M9yo7JlyqEYKjmZ1ihcuJbD',
        title:'tea',
        price:1.5,
    },
    {
        id:'price_1M9yiSJlyqEYKjmZYp3mHQ1Q',
        title:'coffee',
        price:3.5,
    },
    {
        id:'price_1M9ypMJlyqEYKjmZisjS5y7g',
        title:'milk',
        price:1.25,
    },
];
function getProductData(id){
    let productData = productsArray.find(product => product.id ===id);
    if (productData === undefined){
        console.log('Product not found that has ID number: '+id);
        return undefined;
    }
    return productData;
}

export {productsArray, getProductData};