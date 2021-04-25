import MARCAGOL10_CONFIG from '@/config'
import axios from 'axios'
const {API_URL} = MARCAGOL10_CONFIG;

export default{
  getChampionships(){
    return axios.get(API_URL + 'championships', {
      headers: {
          'cache-control': "no-cache, private",
          'content-type': "application/json"
        }
    });
  },

  getClasics(slug){
    return axios.post(API_URL + `clasics/${slug}`, {
      headers: {
          'cache-control': "no-cache, private",
          'content-type': "application/json"
        }
    });
  },
}
