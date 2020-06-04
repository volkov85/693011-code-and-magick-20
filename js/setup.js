'use strict';

var userDialog = document.querySelector('.setup');

userDialog.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surenames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// Случайный порядок имени и фамилии по алгоритму Фишера — Йетса
var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    var t = array[i]; array[i] = array[j]; array[j] = t; // поменять элементы местами
  }
  return array;
};

// Создание массива со случайным именем и фамилией и преобразование в строку
var nameGenerate = function () {
  var randomName = names[Math.floor(Math.random() * (names.length))];
  var randomSurename = surenames[Math.floor(Math.random() * (surenames.length))];
  var nameArray = [randomName, randomSurename];

  return shuffle(nameArray).join(' ');
};

// Заполнение массива wizards объектами
var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards.push(
      {
        name: nameGenerate(),
        coatColor: coatColors[Math.floor(Math.random() * (coatColors.length))],
        eyesColor: eyesColors[Math.floor(Math.random() * (eyesColors.length))]
      }
  );
}
