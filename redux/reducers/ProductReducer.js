const INITIAL_STATE = {
    history: [],
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
            const remkey = action.payload;
        return { history: history.filter(obj => obj.key !== remkey)}

        default:
            return state
    }
}

export default productReducer;