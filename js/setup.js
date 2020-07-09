'use strict';

(function () {
  var Wizard = {
    COATS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
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

  /**
   * Заполнение блока DOM-элементами на основе массива JS-объектов
   * @param  {Array} wizards - массив, содержащий сгенерированные данные
   */
  var successHandler = function (wizards) {
    window.render.appendWizard(wizards);
  };

  /**
   * Формирование и вывод сообщения об ошибке
   * @param {string} errorMessage - строка сообщение об ошибке
   */
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEye = setup.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatInput = setup.querySelector('input[name="coat-color"]');
  var eyesInput = setup.querySelector('input[name="eyes-color"]');
  var fireballInput = setup.querySelector('input[name="fireball-color"]');

  window.colorize(Wizard.COATS, wizardCoat, coatInput);
  window.colorize(Wizard.EYES, wizardEye, eyesInput);
  window.colorize(Wizard.FIREBALL, wizardFireball, fireballInput);

  var form = setup.querySelector('.setup-wizard-form');
  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);
})();
