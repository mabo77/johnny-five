var five = require('../lib/johnny-five.js'),
    board, repl;

board = new five.Board({
  debug: true
});

board.on("ready", function() {

  var claw = 9,
      arm = 11,
      degrees = 10,
      incrementer = 10,
      last;

  this.board.pinMode( claw, 3 );
  this.board.pinMode( arm, 3 );

  setInterval(function() {

    if ( degrees >= 180 || degrees === 0 ) {
      incrementer *= -1;
    }

    degrees += incrementer;

    if ( degrees === 180 ) {
      if ( !last || last === 90 ) {
        last = 180;
      } else {
        last = 90;
      }

      this.board.servoWrite( arm, last );
    }

    this.board.servoWrite( claw, degrees );

  }.bind(this), 50);
});