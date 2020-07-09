'use strict';

window.render = (function () {
  var Wizard = {
    COUNT: 4
  };

  /**
   * Создание DOM элемента на основе JS объекта
   * @param {Object} wizard - элемент массива wizards
   * @return {Object} wizardElement - клон ноды .setup-similar-item с рандомными данными
   */
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  return {
    appendWizard: function (wizards) {
      var fragment = document.createDocumentFragment();
      var setup = document.querySelector('.setup');
      var similarListElement = setup.querySelector('.setup-similar-list');

      for (var i = 0; i < Wizard.COUNT; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);

      setup.querySelector('.setup-similar').classList.remove('hidden');
    }
  };
})();
