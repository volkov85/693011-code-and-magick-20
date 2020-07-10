'use strict';

(function () {

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var storedWizards = [];

  /**
   * Создает систему рангов для сортировки по приоритетам
   * @param {Object} wizard - маг, которому нужно присвоить ранг
   * @return {number} rank - количество баллов для мага
   */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  /**
   * Сортировка по имени в алфавитном порядке в случае, если все другие параметры равны
   * @param {string} left - имя для сортировки
   * @param {string} right - имя для сортировки
   * @return {number} - возвращает 1, -1 или 0 для передачи в метод sort()
   */
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  /**
   * Вызывает повторный рендеринг отсортированных магов
   */
  var updateWizards = function () {
    window.render.appendWizard(storedWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  /**
   * Вызов функции повторного рендеринга при изменении цвета глаз
   * @param {string} color - цвет глаз
   */
  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  /**
   * Вызов функции повторного рендеринга при изменении цвета мантии
   * @param {string} color - цвет мантии
   */
  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  /**
   * Заполнение блока DOM-элементами на основе массива JS-объектов
   * @param  {Array} wizards - массив, содержащий сгенерированные данные
   */
  var successHandler = function (wizards) {
    storedWizards = wizards;
    updateWizards();
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
  var form = setup.querySelector('.setup-wizard-form');

  /**
   * Вызывает функцию отправки данных на сервер
   * @param {Object} evt - событие submit
   */
  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);
})();
