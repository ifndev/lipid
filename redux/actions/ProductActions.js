export const addProduct = product => (
    {
        type: 'ADD_PRODUCT',
        payload: product,
    }
);

export const removeProduct = key => (
    {
        type: 'REMOVE_PRODUCT',
        payload: key,
    }
);