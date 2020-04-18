const INITIAL_STATE = {
    history: [
        {
            code: '3274080005003',
            product: {
                generic_name: "Eau de source naturelle",
                product_name: "Eau de source",
                image_front_url: "https://static.openfoodfacts.org/images/products/327/408/000/5003/front_fr.530.400.jpg",
                nutriscore_data:
                {
                    grade: "a",
                },
            },
        },
        {
            code: '3564709000169',
            product: {
                generic_name: "15 Galettes pur beurre - Broyé du Poitou",
                product_name: "Broyé du Poitou",
                image_front_url: "https://static.openfoodfacts.org/images/products/356/470/900/0169/front_fr.10.400.jpg",
                nutriscore_data:
                {
                    grade: "c",
                },
            }
        },
        {
            code: '3073781070286',
            product: {
                generic_name: "Fromage fondu",
                product_name: "La Vache qui rit",
                image_front_url: "https://static.openfoodfacts.org/images/products/307/378/107/0286/front_fr.4.400.jpg",
                nutriscore_data:
                {
                    grade: "b",
                },
            },
        },
        {
            code: '8000300264388',
            product: {
                generic_name: "Chocolat au lait et céréales croustillantes",
                product_name: "Crunch",
                image_front_url: "https://static.openfoodfacts.org/images/products/800/030/026/4388/front_fr.67.400.jpg",
                nutriscore_data:
                {
                    grade: "d",
                },
            },
    
        },
    ],
}

const productReducer = (state = INITIAL_STATE, action) => {
    const {
        history,
    } = state;

    switch (action.type) {
        case 'ADD_PRODUCT':

            const addedProduct = action.payload;
            history.unshift(addedProduct);
        return {history};

        case 'REMOVE_PRODUCT':
            const remcode = action.payload;
        return { history: history.filter(obj => obj.code !== remcode)}

        default:
            return state
    }
}

export default productReducer;