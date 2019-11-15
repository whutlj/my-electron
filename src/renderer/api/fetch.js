import qs from 'qs';
const baseUrl = 'http://122.51.140.182:8888';
export const get = (url, data, options = {}) => {
  url = `${baseUrl}${url}`;
  if (data) {
    url = `${url}?${qs.stringify(data)}`;
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: options.credentials || 'same-origin',
      method: 'GET',
      mode: options.mode || 'cors'
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.code === 200) {
          resolve(res);
        } else {
          reject('获取数据失败');
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const post = (url, data, options = {}) => {
  url = `${baseUrl}${url}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      body: qs.stringify(data), // must match 'Content-Type' header
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: options.credentials || 'same-origin',
      method: 'POST',
      mode: options.mode || 'cors'
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        if (res.code === 200) {
          resolve(res);
        } else {
          reject('获取数据失败');
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
