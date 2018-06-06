import config from 'app/config';
import {refresh} from './refreshTokenAPI';

export const dbSendLogs = async(data) => {
    const newToken = await refresh();

    return new Promise((resolve, reject) => {
        if (!newToken) resolve(null);
        let url = config.server + '/public-api/mobile-logs';

        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(r => r.json())
            .then((responseData) => {
                resolve(responseData);

            })
            .catch((error) => {
                console.warn(error)
            })
    });
};
