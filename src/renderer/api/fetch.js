import is from 'electron-is';
import qs from 'qs';
const baseUrl = 'http://localhost:9999';
export const get = (url, data, options) => {
  url = `${baseUrl}${url}`;
  if (data) {
    url = `${url}?${qs.stringify(data)}`;
  }
  return fetch(url, {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    method: 'GET',
    mode: 'cors'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const post = (url, data, options) => {
  url = `${baseUrl}${url}`;
  return fetch(url, {
    body: qs.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    method: 'POST',
    mode: 'cors'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
