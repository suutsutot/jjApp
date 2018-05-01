import keyBy from 'lodash/keyBy'
import filter from 'lodash/filter'

const service = {
    getActivities(){
        return fetch('http://justjoin1.ru/public-api/activities',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
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