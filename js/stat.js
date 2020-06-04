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
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  arr.forEach(function (item) {
    if (item > maxElement) {
      maxElement = item;
    }
  });

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

  players.forEach(function (item, index) {
    var currentHeight = (BAR_HEIGHT * times[index]) / maxTime;
    var spaceBetweenBars = CLOUD_X + BAR_WIDTH + (GAP + BAR_WIDTH * 2) * index;

    ctx.fillText(Math.round(times[index]), spaceBetweenBars, CLOUD_HEIGHT - currentHeight - FONT_GAP - GAP);
    ctx.fillStyle = (item === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.floor(Math.random() * 101) + '%, 50%)';
    ctx.fillRect(spaceBetweenBars, CLOUD_HEIGHT - currentHeight, BAR_WIDTH, currentHeight - FONT_GAP * 2);
    ctx.fillStyle = '#000';
    ctx.fillText(item, spaceBetweenBars, CLOUD_HEIGHT - FONT_GAP - GAP);
  });
};
