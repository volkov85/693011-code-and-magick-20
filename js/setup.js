'use strict';

var WIZARD = {
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
  ]
};

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
  min = Math.ceil(min);
  max = Math.floor(max);
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
 * Создание массива со случайными именем и фамилией, перемешивание и преобразование в строку
 * @return {string} - строка вида 'имя фамилия'
 */
var nameGenerate = function () {
  var randomName = getRandomElementFromArray(WIZARD.NAMES);
  var randomSurename = getRandomElementFromArray(WIZARD.SURNAMES);
  var nameArray = [randomName, randomSurename];
  return shuffleArray(nameArray).join(' ');
};

/**
 * Генерирует массив моков, каждый элемент которого состоит из объекта
 * @param  {number} wizardsCount - желаемое количевто элементов массива
 * @return {Array} wizards - готовый массив с требуемой длиной
 */
var generateWizards = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizards.push(
        {
          name: nameGenerate(),
          coatColor: getRandomElementFromArray(WIZARD.COATS),
          eyesColor: getRandomElementFromArray(WIZARD.EYES)
        }
    );
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
  wizards.forEach(function (item) {
    fragment.appendChild(renderWizard(item));
  });
  similarListElement.appendChild(fragment);
};

var setup = document.querySelector('.setup');
var wizards = generateWizards(WIZARD.COUNT);
setup.querySelector('.setup-similar').classList.remove('hidden');
pushWizards(wizards);

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});
