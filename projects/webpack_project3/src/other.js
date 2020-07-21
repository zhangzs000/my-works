import frenchChance from './random';
import $ from 'jquery';

$('#startButton').on('click', () => {
  let spans = $('span');
  for (const span of spans) {
    span.style.backgroundColor = 'inherit';
  }
  let champion;
  if (frenchChance()) {
    champion = 'France';
  } else {
    champion = 'Croatia';
  }
  $('#'+champion).css('backgroundColor','red');
});
