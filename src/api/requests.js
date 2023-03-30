import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式
import "nprogress/nprogress.css";

const requests = axios.create({
    //baseURL: localStorage.getItem("baseURL"),
    //baseURL: 'http://localhost:8080',
    baseURL: window.envs.BASE_IP,
    timeout: 10 * 1000
})

// request 拦截器
requests.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    nprogress.start();
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
requests.interceptors.response.use(
    response => {
        nprogress.done();
        return response.data;
    },
    error => {
        nprogress.done();
        console.log('error=', error) // for debug
        return Promise.reject(error)
    }
)
export default requests