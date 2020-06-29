'use strict';

(function () {
  var Wizard = {
    COUNT: 4,
    NAMES: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    SURNAMES: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг'
    ],
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
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  /**
   * Перемешивание массива по алгоритму Фишера — Йетса
   * @param  {Array} array - исходный массив
   * @return {Array} array - перемешанный массив
   */
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = array[i];
      array[i] = array[j];
      array[j] = t;
    }
    return array;
  };

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
   * Создаёт новый массив, в котором будут все элементы исходного, за исключением элемента filter
   * @param {Array} array - исходный массив
   * @param {string} filter - элемент, который надо исключить из нового массива
   * @return {Array} - новый отфильтрованный массив
   */
  var getFilteredArray = function (array, filter) {
    return array.filter(function (item) {
      return item !== filter;
    });
  };

  /**
   * Генерирует массив моков, каждый элемент которого состоит из объекта
   * @param  {number} wizardsCount - желаемое количевто элементов массива
   * @return {Array} wizards - готовый массив с требуемой длиной
   */
  var generateWizards = function (wizardsCount) {
    var wizards = [];
    var nameWizard = getRandomElementFromArray(Wizard.NAMES);
    var surnameWizard = getRandomElementFromArray(Wizard.SURNAMES);
    var generatedName = shuffleArray([nameWizard, surnameWizard]).join(' ');
    var reducedNamesArray = getFilteredArray(Wizard.NAMES, nameWizard);
    var reducedSurnamesArray = getFilteredArray(Wizard.SURNAMES, surnameWizard);
    for (var i = 0; i < wizardsCount; i++) {
      wizards.push({
        name: generatedName,
        coatColor: getRandomElementFromArray(Wizard.COATS),
        eyesColor: getRandomElementFromArray(Wizard.EYES)
      });
      reducedNamesArray = getFilteredArray(reducedNamesArray, nameWizard);
      nameWizard = getRandomElementFromArray(reducedNamesArray);
      reducedSurnamesArray = getFilteredArray(reducedSurnamesArray, surnameWizard);
      surnameWizard = getRandomElementFromArray(reducedSurnamesArray);
      generatedName = shuffleArray([nameWizard, surnameWizard]).join(' ');
    }
    return wizards;
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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  /**
   * Заполнение блока DOM-элементами на основе массива JS-объектов
   * @param  {Array} wizards - массив, содержащий сгенерированные данные
   */
  var pushWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var similarListElement = setup.querySelector('.setup-similar-list');
    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    similarListElement.appendChild(fragment);
  };

  var setup = document.querySelector('.setup');
  var wizards = generateWizards(Wizard.COUNT);

  setup.querySelector('.setup-similar').classList.remove('hidden');
  pushWizards(wizards);

  var userNameInput = document.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEye = setup.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatInput = setup.querySelector('input[name="coat-color"]');
  var eyesInput = setup.querySelector('input[name="eyes-color"]');
  var fireballInput = setup.querySelector('input[name="fireball-color"]');

  window.colorize(Wizard.COATS, wizardCoat, coatInput);
  window.colorize(Wizard.EYES, wizardEye, eyesInput);
  window.colorize(Wizard.FIREBALL, wizardFireball, fireballInput);
})();
