import { useState } from "react";

export const useApi = () => {
    let [errorMessage, setErrorMessage] = useState(null);

    const sendRequest = (url, method, body, action) => {
        fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : null
        })
            .then((resp) => { // a fetch visszaad egy Response objektumot
                if (!resp.ok) {
                    throw new Error('Something went wrong');
                }

                action(resp.json()); // átadjuk a választ a megadott callback függvénynek (action)
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
    }

    return [sendRequest, errorMessage];
}