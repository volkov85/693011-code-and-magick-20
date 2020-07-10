'use strict';

(function () {

  var Wizard = {
    COATS: [
      'rgb(146, 100, 161)',
      'rgb(215, 210, 55)',
      'rgb(241, 43, 107)',
      'rgb(101, 137, 164)',
      'rgb(0, 0, 0)',
      'rgb(215, 210, 55)',
      'rgb(56, 159, 117)',
      'rgb(241, 43, 107)'
    ],
    EYES: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    FIREBALL: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var setup = document.querySelector('.setup');
  var wizardElement = document.querySelector('.setup-wizard');

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var coatInput = setup.querySelector('input[name="coat-color"]');

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var eyesInput = setup.querySelector('input[name="eyes-color"]');

  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var fireballInput = setup.querySelector('input[name="fireball-color"]');

  /**
   * При клике на node - берет случайный цвет из массива, красит им элемент и добавляет в input
   * @param {Object} colors - массив с цветами
   * @param {Object} node - DOM элемент, который нужно закрасить
   * @param {Object} input - элемент, через который идет отправка данных
   */
  var colorize = function (colors, node, input) {
    node.addEventListener('click', function () {
      var newColor = window.util.getRandomElementFromArray(colors);
      if (node.tagName.toLowerCase() === 'div') {
        node.style.background = newColor;
      } else {
        node.style.fill = newColor;
      }
      input.value = newColor;
      if (node.classList.value === 'wizard-coat') {
        wizard.onCoatChange(newColor);
      } else if (node.classList.value === 'wizard-eyes') {
        wizard.onEyesChange(newColor);
      }
    });
  };

  colorize(Wizard.COATS, wizardCoatElement, coatInput);
  colorize(Wizard.EYES, wizardEyesElement, eyesInput);
  colorize(Wizard.FIREBALL, wizardFireball, fireballInput);

  window.wizard = wizard;
  return window.wizard;
})();
