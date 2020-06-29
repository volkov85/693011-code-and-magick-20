'use strict';

(function () {
  /**
   * Генерирует рандомное число в диапазоне (Максимум и минимум включаются)
   * @param  {number} min - от какого числа
   * @param  {number} max - до какого числа
   * @return {number} - рандомное число из диапазона
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Берет случайный элемент из массива
   * @param  {Array} array - исходный массив
   * @return {string} - рандомный элемент из массива
   */
  var getRandomElementFromArray = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  /**
   * При клике на node - берет случайный цвет из массива, красит им элемент и добавляет в input
   * @param {Object} colors - массив с цветами
   * @param {Object} node - DOM элемент, который нужно закрасить
   * @param {Object} input - элемент, через который идет отправка данных
   */
  window.colorize = function (colors, node, input) {
    node.addEventListener('click', function () {
      var newColor = getRandomElementFromArray(colors);
      if (node.tagName.toLowerCase() === 'div') {
        node.style.background = newColor;
      } else {
        node.style.fill = newColor;
      }
      input.value = newColor;
    });
  };
})();
