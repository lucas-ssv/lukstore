export function signUpSuccess(name, email, password) {
    return {
        type: '@user/SIGN_UP_SUCCESS',
        payload: { name, email, password },
    };
}

export function signUpFailure() {
    return {
        type: '@user/SIGN_UP_FAILURE',
    };
}

export function updateProfileRequest(profile) {
    return {
        type: '@user/UPDATE_PROFILE_REQUEST',
        payload: { profile },
    };
}

export function updateProfileSuccess(profile) {
    return {
        type: '@user/UPDATE_PROFILE_SUCCESS',
        payload: { profile },
    };
}

export function updateProfileFailure() {
    return {
        type: '@user/UPDATE_PROFILE_FAILURE',
    };
}
