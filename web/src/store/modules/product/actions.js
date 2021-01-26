export function registerProductRequest(product) {
    return {
        type: '@product/REGISTER_PRODUCT_REQUEST',
        payload: { product },
    };
}

export function registerProductSuccess(product) {
    return {
        type: '@product/REGISTER_PRODUCT_SUCCESS',
        payload: { product },
    };
}

export function registerProductFailure() {
    return {
        type: '@product/REGISTER_PRODUCT_FAILURE',
    };
}

export function updateProductSuccess(product, id) {
    return {
        type: '@product/UPDATE_PRODUCT_SUCCESS',
        payload: { product, id },
    };
}

export function updateProductFailure() {
    return {
        type: '@product/UPDATE_PRODUCT_FAILURE',
    };
}

export function deleteProductRequest(id, user_id) {
    return {
        type: '@product/DELETE_PRODUCT_REQUEST',
        payload: { id, user_id },
    };
}

export function deleteProductSuccess(id, user_id) {
    return {
        type: '@product/DELETE_PRODUCT_SUCCESS',
        payload: { id, user_id },
    };
}

export function deleteProductFailure() {
    return {
        type: '@product/DELETE_PRODUCT_FAILURE',
    };
}
