import is from 'electron-is';
import qs from 'qs';
const baseUrl = 'http://wyy.aisha.xyz';
export const get = (url, data, options) => {
  url = `${baseUrl}${url}`;
  if (data) {
    url = `${url}?${qs.stringify(data)}`;
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      method: 'GET',
      mode: 'cors'
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

export const post = (url, data, options) => {
  url = `${baseUrl}${url}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      body: qs.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      method: 'POST',
      mode: 'cors'
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
