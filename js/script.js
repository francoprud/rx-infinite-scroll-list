var getPosition = function(actual, movement) {
  var ans = actual + movement;
  var length = list.length;
  return ans < 0 ? ans + length : ans % length;
};

var getMovement = function(movement) {
  return movement != 0 ? Math.abs(movement) / movement : movement;
};

var focusElement = function(movement) {
  actualPosition = getPosition(actualPosition, movement);
  $('#main').empty();
  $('#main').append(list[actualPosition].cloneNode(true));
};

var list = $.find('img');
var actualPosition = 0;

focusElement(actualPosition);

var mousemove = Rx.Observable.fromEvent(document, 'mousedown')
  .map(function(mouseDown) {
    return Rx.Observable.fromEvent(document, 'mousemove')
      .map(function(mouseMove) {
        return getMovement(mouseMove.movementX);
      }).takeUntil(Rx.Observable.fromEvent(document, 'mouseup'));
  }).concatAll().throttle(300);

mousemove.forEach(focusElement);
