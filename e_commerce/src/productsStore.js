const productsArray = [
    {
        id:1,
        title:'tea',
        price:1.5,
    },
    {
        id:2,
        title:'coffee',
        price:3.5,
    },
    {
        id:3,
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