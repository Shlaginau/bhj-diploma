/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  let url = options.url.toString();
  let urlWithParams = url;

  if (options.method === 'GET' && options.data) {
    const params = new URLSearchParams(options.data).toString();
    urlWithParams = `${url}?${params}`;
  }

  try {
    xhr.open(options.method, urlWithParams);
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        options.callback(null, xhr.response);
      } else {
        const error = new Error(`Request failed with status ${xhr.status}`);
        options.callback(error, null);
      }
    });

    xhr.addEventListener('error', () => {
      const error = new Error('Request failed');
      options.callback(error, null);
    });

    if (options.method === 'GET') {
      xhr.send();
    } else {
      const formData = new FormData();
      for (let key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.send(formData); 
    }
  } catch (e) {
    options.callback(e, null);
  }
};
