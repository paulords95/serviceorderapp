const axios = require('axios')

const api = axios.create({
    baseURL: "http://192.168.0.11:5000",
  });
  


const checkDbConnection = () => {
    api
      .get("/api/checkdb")
      .then(function (response) {
        return true
      })
      .catch(function (error) {
        console.log(false)
        return false
      })
      .then(function () {
          
      });
}


export default checkDbConnection