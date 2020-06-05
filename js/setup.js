'use strict';

var userDialog = document.querySelector('.setup');

userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Случайный порядок имени и фамилии по алгоритму Фишера — Йетса
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    var t = array[i]; array[i] = array[j]; array[j] = t; // поменять элементы местами
  }
  return array;
};

// Создание массива со случайными именем и фамилией и преобразование в строку
var nameGenerate = function () {
  var randomName = WIZARD_NAMES[Math.floor(Math.random() * (WIZARD_NAMES.length))];
  var randomSurename = WIZARD_SURNAMES[Math.floor(Math.random() * (WIZARD_SURNAMES.length))];
  var nameArray = [randomName, randomSurename];

  return shuffle(nameArray).join(' ');
};

// Заполнение массива wizards объектами
var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards.push(
      {
        name: nameGenerate(),
        coatColor: WIZARD_COATS[Math.floor(Math.random() * (WIZARD_COATS.length))],
        eyesColor: WIZARD_EYES[Math.floor(Math.random() * (WIZARD_EYES.length))]
      }
  );
}

// Создание DOM элемента на основе JS объекта
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Заполнение блока DOM-элементами на основе массива JS-объектов
var fragment = document.createDocumentFragment();
wizards.forEach(function (item, index) {
  fragment.appendChild(renderWizard(wizards[index]));
});
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
