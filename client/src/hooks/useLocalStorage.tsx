import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading local storage', error);
            return initialValue;
        }
    });

    const setValue = (value: string) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting local storage', error);
        }
    };

    return [storedValue, setValue];
};
