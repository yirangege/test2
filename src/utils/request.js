import axios from 'axios'

const request = axios.create({
    //baseURL: 'http://127.0.0.1:10006/index.php',
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000, //60秒超时
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});




/*
request.interceptors.request.use((config) => {
    store.commit('showLoading')
    return config
}, (err) => {
    store.commit('hideLoading')
    return Promise.reject(err)
})
*/


export default {
    request
}