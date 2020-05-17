import { fetchProductFromBarcode } from "./offHandler";

export const addProductFromBarcode = (barcode, addProduct) => {
    return new Promise((resolve, reject) => {
        //We try to fetch the data corresponding to the barcode from OpenFoodFacts

        fetchProductFromBarcode(barcode).then(responseJson => {

            const { generic_name, product_name, image_front_url, nutriscore_data } = responseJson.product

            // Add the product to the redux state
            addProduct({
                code: barcode,
                product: {
                    generic_name: generic_name || null,
                    product_name: product_name || 'Name not found',
                    image_front_url: image_front_url || null,
                    nutriscore_data: {
                        grade: nutriscore_data?.grade || '?'
                    }
                },
            });

            resolve("succesfully added " + barcode);
        })
            //If response is not in json then in error
            .catch((error) => {
                console.log("ERROR WHILE FETCHING A PRODUCT:" + error);
                reject("fetchError");
            });
    })
}