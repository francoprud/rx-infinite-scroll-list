var getPosition = (actual, movement) => {
  var ans = actual + movement;
  var length = list.length;

  while (ans >= length || ans < 0) {
    if (ans >= length) {
      ans %= length;
    } else {
      ans += length;
    }
  }
  return ans;
};

var getMovement = (movement) => {
  if (movement > 0) {
    return 1;
  } else if (movement < 0) {
    return -1;
  } else {
    return 0;
  }
};

var focusElement = (position) => {
  $('#main').empty();
  $('#main').append(list[position].cloneNode(true));
};

var list = $.find('img');
var actualPosition = 0;
var mousemove = Rx.Observable.fromEvent(document, 'mousemove')
                  .map((event) => { return getMovement(event.movementX) })
                  .map((movement) => { return getPosition(actualPosition, movement)});

var subscription = mousemove.throttle(500).subscribe((position) => {
  actualPosition = position;
  focusElement(actualPosition);
});

focusElement(actualPosition);
