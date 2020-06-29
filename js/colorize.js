'use strict';

(function () {
  /**
   * При клике на node - берет случайный цвет из массива, красит им элемент и добавляет в input
   * @param {Object} colors - массив с цветами
   * @param {Object} node - DOM элемент, который нужно закрасить
   * @param {Object} input - элемент, через который идет отправка данных
   */
  window.colorize = function (colors, node, input) {
    node.addEventListener('click', function () {
      var newColor = window.util.getRandomElementFromArray(colors);
      if (node.tagName.toLowerCase() === 'div') {
        node.style.background = newColor;
      } else {
        node.style.fill = newColor;
      }
      input.value = newColor;
    });
  };
})();
