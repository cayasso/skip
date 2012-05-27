var Skip = (function (window, document, undefined) {

  "use strict";

  var vendorPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''],

      Skip = function (element, options) {

        // set element
        this.panel = element;

        // determine width of each slide
        this.width = this.panel.getBoundingClientRect().width || this.panel.offsetWidth;
        this.height = this.panel.getBoundingClientRect().height || this.panel.offsetHeight;

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

        this.padding = 250;
        this._padding = 250;

        // trigger initialization
        this.setup();

        // bind events
        this.on();
        
      },

      onTouchMove;

  Skip.prototype.setup = function () {
    
  };

  Skip.prototype.on = function (e) {
    // add event listeners
    if (this.panel.addEventListener) {
      this.panel.addEventListener(this._eventStart, this, false);
      this.panel.addEventListener(this._eventMove, this, false);
      this.panel.addEventListener(this._eventEnd, this, false);
      window.addEventListener('resize', this, false);
    }
  };

  Skip.prototype.off = function (e) {
    // remove event listeners
    if (this.panel.addEventListener) {
      this.panel.removeEventListener(this._eventStart, this, false);
      this.panel.removeEventListener(this._eventMove, this, false);
      this.panel.removeEventListener(this._eventEnd, this, false);
      window.removeEventListener('resize', this, false);
    }
  };

  // Handle events
  Skip.prototype.handleEvent = function(e) {
    switch(e.type) {
      case this._eventStart: this.onTouchStart(e); break;
      //case this._eventMove: this.onTouchMove(e); break;
      case this._eventEnd: this.onTouchEnd(e); break;
    }
  };

  Skip.prototype.onTouchStart = function (e) {
    var self = this;

    self.sliding = true;

    this._start = {
      // get touch coordinates for delta calculations in onTouchMove
      pageX: this._isTouch ? e.touches[0].pageX : e.pageX,
      pageY: this._isTouch ? e.touches[0].pageY : e.pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )
    };


    (function loop(){

      if (!self.sliding) return;
      
      self.onTouchMove(e);
      requestAnimFrame(loop);

    })();

  };

  /*Skip.prototype.onTouchMove = */

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

      if (this.padding < 0)
        this.padding = 0;
      else
        this.padding = this.padding - 10;

      $('.content').css('-webkit-transform', 'translate3d('+ this.padding +'px, 0px, 0px)');

    } else {
      if (this.padding > 280)
        this.padding = 250;
      else
        this.padding = this.padding + 10;

      $('.content').css('-webkit-transform', 'translate3d('+ this.padding +'px, 0px, 0px)');
    }
  };

  Skip.prototype.slide = function () {

  };

  Skip.prototype.onTouchEnd = function (e) {
     this.sliding = false;
  };

  Skip.prototype.onTransitionEnd = function () {

  };

  Skip.prototype._move = function () {

  };

  Skip.prototype._animate = function () {

  };

  Skip.prototype._translate = function () {

  };

 window.requestAnimFrame = (function(cb) {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(cb){ window.setTimeout(cb, 1000 / 60); };
  })();

    

  return Skip;


}).call(this, window, document);

