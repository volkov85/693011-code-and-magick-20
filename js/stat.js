'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  // ctx.beginPath();
  // ctx.moveTo(x, y + 30);
  // ctx.bezierCurveTo(x, y + 20, x + 10, y, x + 40, y);
  // ctx.lineTo(x + 380, y);
  // ctx.bezierCurveTo(x + 390, y, x + 410, y, x + 420, y + 30);
  // ctx.lineTo(x + 420, y + 240);
  // ctx.bezierCurveTo(x + 420, y + 250, x + 410, y + 270, x + 380, y + 270);
  // ctx.lineTo(x + 30, y + 270);
  // ctx.bezierCurveTo(x + 10, y + 270, x, y + 250, x, y + 240);
  // ctx.closePath();
  // ctx.stroke();
  // ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y * 4);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y * 4 + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var currentHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var spaceBetweenBars = CLOUD_X + BAR_WIDTH + (GAP + BAR_WIDTH * 2) * i;
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, 100%, 50%)';
    // Вариант через интерполяцию
    // `hsl(240, ${Math.floor(Math.random() * 101)}%, 50%)`
    ctx.fillText(Math.round(times[i]), spaceBetweenBars, CLOUD_Y * 8 + GAP);
    ctx.fillRect(spaceBetweenBars, CLOUD_HEIGHT - currentHeight, BAR_WIDTH, currentHeight - FONT_GAP * 2);
    ctx.fillText(players[i], spaceBetweenBars, CLOUD_HEIGHT - FONT_GAP - GAP);
  }
};
