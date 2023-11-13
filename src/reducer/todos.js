export const initialState = {
    user: {
    id: null
    }
}
export function reducer(state, action) {
    switch (action.type) {
        case "LOGIN_USER":
            //guardamos en localstorage
            globalThis.localStorage.setItem("USER", JSON.stringify(action.payload))
            return { ...state, 
                user:{
                    id:action.payload.id,
                }, 
            };
        //action payload es la información que necesita la acción

        //guardar solo el userId
        // case "USER_ID":
        //     return {
        //         ...state,
        //         userId: action.payload,
        //     };
        default:
            return state;
    }
}