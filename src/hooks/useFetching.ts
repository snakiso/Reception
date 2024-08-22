import {useEffect} from "react";
import {UseRegistered} from "../services/useRegistered.ts";


export const useFetching = () => {
    const {mutate: update, response, isSuccess} = UseRegistered();

    useEffect(() => {
        const processRegisteredIds = () => {
            if (localStorage.getItem('registered')) {

                const processNextId = () => {
                    const idsForConfirm = JSON.parse(localStorage.getItem('registered'));
                    const idsForCancel = JSON.parse(localStorage.getItem('unregistered'));
                    if (idsForCancel.length > 0) {
                        const id = idsForCancel[0]
                        update({id, registered: false});
                    }
                    if (idsForConfirm.length > 0) {
                        const id = idsForConfirm[0];

                        update({id, registered: true});
                    } else {
                        return
                    }
                };

                const interval = setInterval(() => {
                    processNextId();
                }, 5000);

                return () => clearInterval(interval);
            } else {
                console.log('Массив чисел не найден в локальном хранилище браузера.');
            }
        };

        processRegisteredIds();
    }, []);

    useEffect(() => {
        if (isSuccess && response?.IS_ATTENDED) {
            let ids = JSON.parse(localStorage.getItem('registered'));
            const id = ids[0];
            ids = ids.filter((item) => item !== id);

            localStorage.setItem('registered', JSON.stringify(ids));
        } else if (isSuccess && !response?.IS_ATTENDED) {
            let ids = JSON.parse(localStorage.getItem('unregistered'));
            const id = ids[0];
            ids = ids.filter((item) => item !== id);

            localStorage.setItem('unregistered', JSON.stringify(ids));
        }
    }, [isSuccess, response]);
};