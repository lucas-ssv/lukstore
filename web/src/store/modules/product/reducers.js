import produce from 'immer';

export default function product(state = [], action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@product/REGISTER_PRODUCT_SUCCESS': {
                draft.push(action.payload.product);

                break;
            }
            case '@product/DELETE_PRODUCT_SUCCESS': {
                const { id } = action.payload;

                const productExists = draft.findIndex((p) => p.id === id);

                if (productExists) {
                    draft.splice(productExists, 1);
                }

                break;
            }
            default:
        }
    });
}
