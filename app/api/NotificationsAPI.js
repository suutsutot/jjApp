import orderBy from 'lodash/filter'
import {refresh} from './refreshTokenAPI'
import config from 'app/config';

export const getNotifications = async() =>{
    const newToken = await refresh();

    return new Promise((resolve, reject) => {
        if (!newToken) resolve(null);
        let url = config.server + '/api/notifications';
        fetch(url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': newToken.idToken
                }
            })
            .then(r => r.json())
            .then((responseData) => {
                // responseData = orderBy(responseData, ['viewed', 'dateOfCreate'], ['asc', 'desc']);
                // console.log('responseData', responseData)
                resolve(responseData);

            })
            .catch((error) => {
                console.warn(error)
            })
    });
};
