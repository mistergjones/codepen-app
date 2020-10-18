import { useState, useEffect } from "react";

const PREFIX = "codepen-clone-";

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        // get json value from local storage
        const jsonValue = localStorage.getItem(prefixedKey);

        // if we have a value, return the jsonValue as an object.
        if (jsonValue != null) {
            //console.log(`Json parse value is: `, JSON.parse(jsonValue));
            return JSON.parse(jsonValue);
        }

        // if we don't have one in local storage, we use the initial value of the function version of use state
        if (typeof initialValue === "function") {
            //console.log(`initialValue function is `, initialValue());
            return initialValue();
        } else {
            //console.log(`plain initialValue is`, initialValue);
            return initialValue;
        }
    });

    // setup a useEffect for what happens every time we change a value. i.e. update the local storage
    useEffect(() => {
        // set the tiem and the previxed key as teh string version of the value
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
