import axios from 'axios';

let baseURL = '';
// if (process.env.NODE_ENV === 'development') {
//   baseURL = '/proxy';
// }

const service = axios.create({
  baseURL
  // timeout: 240000  // request timeout455445424
});

// request interceptor
service.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'authToken': localStorage.getItem('authToken')
  };
  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
});

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
/**
 * 请求状态码检测
 * @function checkStatus
 * @param  {object} response 请求返回体
 * @return {object} 请求返回体
 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  // Message({
  //   message: `请求错误 ${response.status}: ${response.url},${errortext}`,
  //   type: 'error',
  //   duration: 5 * 1000
  // });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

/**
 * axios发送请求函数
 * @function fetch
 * @param  {string} type 请求类型
 * @param  {string} url 请求url
 * @param  {object} params 请求data数据
 * @return {object} 请求返回体（promise）
 */
const fetch = (type, url, params) => {
  return new Promise((resolve, reject) => {
    const data = (type == 'get' || type == 'delete') ? { params: params } : params;
    service[type](url, data)
      .then(checkStatus)
      .then(response => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
  });
};

export default fetch;