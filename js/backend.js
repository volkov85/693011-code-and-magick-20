'use strict';

window.backend = (function () {

  var DataUrl = {
    SAVE_URL: 'https://javascript.pages.academy/code-and-magick',
    LOAD_URL: 'https://javascript.pages.academy/code-and-magick/data'
  };
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  /**
   * Отправляет или загружает данные в зависимотсти от флага
   * @param {Function} onLoad - функция, отрабатываемая при успешной загрузке
   * @param {Function} onError - функция отрабатывает при возниковении ошибки
   * @param {boolean} flag - флаг-переключатель, передаваемый для отправки или получения данных
   * @param {Object} data - передаваемые данные в случае отправки
   */
  var loadData = function (onLoad, onError, flag, data) {
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

    if (flag) {
      xhr.open('POST', DataUrl.SAVE_URL);
      xhr.send(data);
    } else {
      xhr.open('GET', DataUrl.LOAD_URL);
      xhr.send();
    }
  };

  return {
    /**
     * Функция отправки данных на сервер
     * @param {Object} data - отправляемые данные
     * @param {Function} onLoad - функция, отрабатываемая при успешной загрузке
     * @param {Function} onError - функция отрабатывает при возниковении ошибки
     */
    save: function (data, onLoad, onError) {
      loadData(onLoad, onError, true, data);
    },
    /**
     * Функция получения данных с сервера
     * @param {Function} onLoad - функция, отрабатываемая при успешной загрузке
     * @param {Function} onError - функция отрабатывает при возниковении ошибки
     */
    load: function (onLoad, onError) {
      loadData(onLoad, onError);
    }
  };
})();
