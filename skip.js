var vendorPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];

window.Skip = function (element, options) {

  // set element
  this.Skip = element;

  // determine width of each slide
  this.width = this.Skip.getBoundingClientRect().width || this.Skip.offsetWidth;
  this.height = this.Skip.getBoundingClientRect().height || this.Skip.offsetHeight;

  // return immediately if measurement fails
  if (!this.width) return;

  // is touch device?
  var isTouch = this._isTouch  = ('ontouchstart' in document.documentElement);
  
  // Set event names
  this._eventStart = isTouch ? 'touchstart' : 'mousedown';
  this._eventEnd = isTouch ? 'touchend' : 'mouseup';
  this._eventMove = isTouch ? 'touchmove' : 'mousemove';

  // x y positions
  this._x = 0;
  this._y = 0;

  // start positions
  this._startX = 0;
  this._startY = 0;

  // axis directions
  this._dirX = 'left';
  this._dirY = 'up';

  this.margin = 250;
  this._margin = 250;

  // trigger initialization
  this.setup();

  // bind events
  this.on();
  
};

Skip.prototype.setup = function () {
  
};

Skip.prototype.on = function (e) {
  // add event listeners
  if (this.Skip.addEventListener) {
    this.Skip.addEventListener(this._eventStart, this, false);
    this.Skip.addEventListener(this._eventMove, this, false);
    this.Skip.addEventListener(this._eventEnd, this, false);
    window.addEventListener('resize', this, false);
  }
};

Skip.prototype.off = function (e) {
  // remove event listeners
  if (this.Skip.addEventListener) {
    this.Skip.removeEventListener(this._eventStart, this, false);
    this.Skip.removeEventListener(this._eventMove, this, false);
    this.Skip.removeEventListener(this._eventEnd, this, false);
    window.removeEventListener('resize', this, false);
  }
};

// Handle events
Skip.prototype.handleEvent = function(e) {
  switch(e.type) {
    case this._eventStart: this.onTouchStart(e); break;
    case this._eventMove: this.onTouchMove(e); break;
    case this._eventEnd: this.onTouchEnd(e); break;
  }
};

Skip.prototype.onTouchStart = function (e) {
  this._start = {
    // get touch coordinates for delta calculations in onTouchMove
    pageX: e.touches[0].pageX,
    pageY: e.touches[0].pageY,

    // set initial timestamp of touch sequence
    time: Number( new Date() )
  };
};

Skip.prototype.onTouchMove = function (e) {

  // ensure swiping with one touch and not pinching
  if(this._isTouch && e.touches.length > 1 || e.scale && e.scale !== 1) return;

  var myX = (this._isTouch ? e.touches[0] : e).pageX;
  var myY = (this._isTouch ? e.touches[0] : e).pageY;

  this._dirX = (myX > this._x) ? 'right' : 'left';
  //this._dirY = (myY > this._y) ? 'down' : 'up';

  this._x = myX;
  //this._y = myY;

  if (this._dirX === 'left') {

    if (this.margin < 0)
      this.margin = 0;
    else
      this.margin = this.margin - 10;

    $('.content').css('-webkit-transform', 'translate3d('+ this.margin +'px, 0px, 0px)');

  } else {
    if (this.margin > 280)
      this.margin = 250;
    else
      this.margin = this.margin + 10;

    $('.content').css('-webkit-transform', 'translate3d('+ this.margin +'px, 0px, 0px)');
  }
};

Skip.prototype.onTouchEnd = function (e) {

};

Skip.prototype.onTransitionEnd = function () {

};

Skip.prototype._move = function () {

};

Skip.prototype._animate = function () {

};

Skip.prototype._translate = function () {

};

