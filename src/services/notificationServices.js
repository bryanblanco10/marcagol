import MARCAGOL10_CONFIG from '@/config'
import axios from 'axios'
const {API_URL} = MARCAGOL10_CONFIG;

export default{
  postSubscription(subscription){
    return axios.post(API_URL + 'subscription', {
      body: JSON.stringify(subscription),
      headers: {
          'cache-control': "no-cache, private",
          'content-type': "application/json"
        }
    });
  },

  postNewGol(team){
    return axios.post(API_URL + 'new-gol', {
      body: JSON.stringify({message: team}),
      headers: {
          'cache-control': "no-cache, private",
          'content-type': "application/json"
        }
    });
  }
}

