'use strict';

window.backend = (function () {
  var URL = 'https://javascript.pages.academy/code-and-magick';
  var URL_DATA = 'https://javascript.pages.academy/code-and-magick/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var TIMEOUT_OUT_MS = 1000;

  return {
    /**
     * Функция отправки данных на сервер
     * @param {Object} data - отправляемые данные
     * @param {Function} onLoad - функция, отрабатываемая при успешной загрузке
     * @param {Function} onError - функция отрабатывает при возниковении ошибки
     */
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_OUT_MS;

      xhr.open('POST', URL);
      xhr.send(data);
    },
    /**
     * Функция получения данных с сервера
     * @param {Function} onLoad - функция, отрабатываемая при успешной загрузке
     * @param {Function} onError - функция отрабатывает при возниковении ошибки
     */
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL_DATA);
      xhr.send();
    }
  };
})();
