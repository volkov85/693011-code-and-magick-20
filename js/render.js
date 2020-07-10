'use strict';

window.render = (function () {

  var Wizard = {
    COUNT: 4
  };

  /**
   * Создание DOM элемента на основе объекта
   * @param {Object} wizard - элемент массива wizards
   * @return {Object} element - клон ноды .setup-similar-item с загруженными данными
   */
  var renderWizard = function (wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template');
    var element = wizardTemplate.content.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    element.querySelector('.setup-similar-label').innerText = wizard.name;
    return element;
  };

  return {
    /**
     * Заполнение блока DOM-элементами на основе массива
     * @param  {Array} wizards - массив, содержащий полученные данные
     */
    appendWizard: function (wizards) {
      var fragment = document.createDocumentFragment();
      var setup = document.querySelector('.setup');
      var similarListElement = setup.querySelector('.setup-similar-list');
      var takeNumber = wizards.length > Wizard.COUNT ? Wizard.COUNT : wizards.length;

      similarListElement.innerHTML = '';
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);

      setup.querySelector('.setup-similar').classList.remove('hidden');
    }
  };
})();
