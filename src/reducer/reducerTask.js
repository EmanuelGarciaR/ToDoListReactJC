export const initialState = {
    task: [],
}
export function reducer(init, action) {
    switch (action.type) {
        case "GET_TASK":
            //guardamos en localstorage
            globalThis.localStorage.setItem("TASK", JSON.stringify(action.payload))
            return { ...init, 
                task: action.payload,
            };

        case "ADD_TASK":
            return {...init,
                task: [...init.task, action.payload],
            };
        default:
            return init;
    }
}