export const fetchProductFromBarcode = (barcode) => {
    return new Promise((resolve, reject) => {
        fetch(('https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json'), {
            method: 'GET'
        })
            .then((response) => response.json())
            //If response is in json then in success.
            .then((responseJson) => {
                //This API responds with status 200 even if no product is found. We have to chech status_verbose
                if (responseJson.status_verbose == "product not found") {
                    reject("productNotFoundError")
                }
                else {
                    resolve(responseJson);
                }
            })
            //If response is not in json then in error
            .catch((error) => {
                reject();
            });
    });
}