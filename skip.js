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
    console.log('HOOOOOLA');
    this.panel.style.position = 'absolute';
    this.panel.style.left = 0;
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

    self._sliding = true;
    
    // get touch coordinates for delta calculations in onTouchMove
    this._startX = (this._isTouch ? e.touches[0] : e).pageX;
    this._startY = (this._isTouch ? e.touches[0] : e).pageY;
    
    console.log(this.panel);

    this._startLeft = this._left(this.panel);

    console.log(this._startLeft);

    
    //this.panel.style.position = '0';


    // set initial timestamp of touch sequence
    this._startTime = Number(new Date());

  
    (function loop(){

      if (!self._sliding) return;
      
      self.onTouchMove(e);
      requestAnimFrame(loop);

    })();

  };



  /*Skip.prototype.onTouchMove = */

   Skip.prototype.onTouchMove = function (e) {
    
    // prevent default behavior
    e.preventDefault();
    e.stopPropagation();

    // ensure swiping with one touch and not pinching
    if (this._isTouch && e.touches.length > 1 || e.scale && e.scale !== 1) return;

    var myX = (this._isTouch ? e.touches[0] : e).pageX;
    var myY = (this._isTouch ? e.touches[0] : e).pageY;

    this._dirX = (this._startX > myX) ? 'left' : 'right';
    this._dirY = (this._startY > myY) ? 'up' : 'down';

    
    var left = '-' + (this._startX - myX - this._startLeft) + 'px';

    console.log(left);

    this.panel.style.left = left;


    //'-' + (this._startX - myX - this._startLeft) + 'px';

    //console.log(this._startX, myX, this._startLeft);
   
    //this._x = myX;
    //this._y = myY;

    /*if (this._dirX === 'left') {

      if (this.padding < 0)
        this.padding = 0;
      else
        this.padding = this.padding - 10;
    } else {
      if (this.padding > 280)
        this.padding = 250;
      else
        this.padding = this.padding + 10;
    }*/

    //this.slide($('.content')[0], myX, 300);
    
  };


  Skip.prototype.slide = function (el, x, speed) {

      if (!el) return;

      var style = el.style;

      // set duration speed to 0
      style.webkitTransitionDuration =
      style.MozTransitionDuration =
      style.msTransitionDuration =
      style.OTransitionDuration =
      style.transitionDuration = speed + 'ms';

      style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
      style.msTransform =
      style.MozTransform =
      style.OTransform = 'translateX(' + x + 'px)';
  };

  Skip.prototype.momentum = function (el, e) {

  };

  Skip.prototype.onTouchEnd = function (e) {
    e.preventDefault();
    e.stopPropagation();
    this._sliding = false;

    //if (touchslider.getLeft(elem) > 0) {
    if (this._dirX === 'left') {
      this.slide($('.content')[0], 0, 200);
    } else {
      this.slide($('.content')[0], 250, 200);
    }
      
         
         
  };

  Skip.prototype.onTransitionEnd = function () {

  };

  /**
   * A little helper to parse off the 'px' at the end of the left
   * CSS attribute and parse it as a number.
   */
  Skip.prototype._left = function(el) {
    
    console.log('ON START LEFT', el.style);

    return parseInt(el.style.left.substring(0, el.style.left.length - 2), 10);
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

