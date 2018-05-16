import keyBy from 'lodash/keyBy'
import filter from 'lodash/filter'
import config from 'app/config';

const service = {
    getActivities(){
        let url = config.server + '/public-api/activities';

        return fetch(url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(r => r.json())
            .then((responseData) => {
                responseData = filter(responseData, function (val) {
                    if (val.id) return val;
                });
                responseData = keyBy(responseData, 'id');
                return responseData;

            })
            .catch((error) => {
                console.warn(error)
            })
    }
};

export default service;
