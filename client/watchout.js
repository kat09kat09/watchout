// start slingin' some d3 here.

var Board = function () {
    this.x = 700;
    this.y = 700;
    this.numEnemies = 300;
    this.padding = 20;
    this.currentScore = 0;
    this.maxScore = 0;
    this.numCollisions = 0;

};

var Enemy = function (id) {
    this.x = Math.floor(Math.random () * 699);
    this.y = Math.floor(Math.random () * 699);
    this.id = id;
};


var board = new Board();

var enemies = function () {
    var arrOfEnemies = [];
  for (var i = 0; i < board.numEnemies; i++) {
      arrOfEnemies.push(new Enemy(i));
  }
    return arrOfEnemies;
};

var allEnemies = enemies();

var Player= function() {
    this.x= 350;
    this.y= 350;

};

var playerInstance = new Player();


var gameBoard = d3.select('body')
                    .append('svg')
                    .attr('width', board.x)
                    .attr('height', board.y)
                    .attr('class', 'gameBoard')
                    .attr('border', 1)
                    .style('stroke-width', 5)
                    .style('display', 'block')
                    .style('margin', 'auto');


var borderPath = gameBoard.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("height", board.x)
                    .attr("width", board.y)
                    .style("stroke", 'black' )
                    .style("fill", "none")
                    .style("fill-opacity", 0)
                    .style("stroke-width", 5);


var eCircles = gameBoard.selectAll('circle')
                    .data(allEnemies)
                    .enter()
                    .append('circle')
                    .attr('class', 'enemies')

                    //.style('fill', 'blue')
                    //.style('stroke', 'blue')
                    //.style('fill-opacity',0.5)
                    .style('r', 10)
                    .attr('cx', function () {return Math.random () * 699})
                    .attr('cy', function () {return Math.random () * 699})
                    //.style('fill', "url('asteroid.png')");
                    .attr("xlink:href", "asteroid.png")
                    // .append('image')
                    // .attr("xlink:href", "asteroid.png")
                    // .attr('width', 4)
                    // .attr('height', 4);

var drag = d3.behavior.drag()
   .on("drag", function() {

        //try to use call
        d3.select(this)
          .attr("cx", d3.event.x)
          .attr("cy", d3.event.y);

        playerInstance.x= d3.event.x;
        playerInstance.y= d3.event.y;

   });

var player = gameBoard.append('circle')
                    .attr('class', 'player')
                    .style('fill', 'red')
                    .style('stroke', 'red')
                    .attr('r', 10)
                    .attr('cx', playerInstance.x)
                    .attr('cy', playerInstance.y)
                    .call(drag);

var prevCollision = false;

function collisionCheck () {

  var anyCollision= false;

  for(var i = 0 ; i < allEnemies.length; i++) {
      var dx= allEnemies[i].x + 10 - playerInstance.x;
      var dy= allEnemies[i].y + 10 - playerInstance.y;
      if (Math.sqrt(dx* dx + dy * dy) < (10 * 2)) {
          anyCollision= true;
      }
  }


  if(anyCollision) {
    if (board.currentScore > board.maxScore) {
        board.maxScore = board.currentScore;
        d3.selectAll('.high span').text( board.maxScore);
    }
    board.currentScore = 0;
    if(prevCollision !== anyCollision) {
      board.numCollisions++;
    }

    d3.selectAll('.collisions span').text( board.numCollisions);
  }

  prevCollision = anyCollision;
}

var move = function (element) {
  element.transition()
     .duration (1500)
     .attr('cx', function (d, i) {
         var enemy = allEnemies[i];
         enemy.x = Math.floor(Math.random () * 699);
         return enemy.x;
     })
     .attr('cy', function (d,i) {
        var enemy = allEnemies[i];
        enemy.y = Math.floor(Math.random () * 699);
        return enemy.y;
     })
     .each('end', function (){
      console.log(this);
      move(d3.select(this));
     });


 };

setInterval(function () {
  board.currentScore++;
  d3.selectAll('.current span').text( board.currentScore);
}, 100);

move(eCircles);

d3.timer(collisionCheck);

