'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  /**
   * Отменяет стандартное событие на escape и вызывает функцию closePopup
   * Работает только, если нет в фокусе элемента .setup-user-name
   * @param {Object} evt - KeyboardEvent нажатая клавиша
   */
  var onPopupEscPress = function (evt) {
    if (!document.activeElement.classList.contains('setup-user-name')) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  /**
   * Открытие модального окна, вызов обработчика событий EventListener
   */
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /**
   * Закрытие модального окна, удаление обработчика событий EventListener
   */
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
