// start slingin' some d3 here.

var Board = function () {
    this.x = 700;
    this.y = 700;
    this.numEnemies = 30;
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
                    .style('stroke', 'red')
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
                    .style('fill', 'blue')
                    .style('stroke', 'blue')
                    .style('r', 10)
                    .attr('class', 'enemies')
                    .attr('cx', function () {return Math.random () * 699})
                    .attr('cy', function () {return Math.random () * 699});


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

var cb = function () {
  gameBoard.selectAll(".enemies").transition()
     .attr('cx', function (d, i) {
         var enemy = allEnemies[i];
         enemy.x= Math.floor(Math.random () * 699);
         return enemy.x;
     })
     .attr('cy', function (d,i) {
        var enemy= allEnemies[i];
        enemy.y= Math.floor(Math.random () * 699);
        return enemy.y;
     });

    board.currentScore += 20;

    d3.selectAll('.current span')
      .text( board.currentScore);

    // span = document.getElementById("myspan");
    // txt = document.createTextNode("your cool text");
    // span.innerText = txt.textContent;

    collisionCheck();

 };

setInterval (cb, 1000);

function collisionCheck () {
    for(var i=0 ; i< allEnemies.length; i++) {
      console.log('enemies x', allEnemies[i].x);
      console.log('player x',  playerInstance.x);
      if (allEnemies[i].x === playerInstance.x && allEnemies[i].y === playerInstance.y) {
        console.log('has a collision');
        if (board.currentScore > board.maxScore) {
            board.maxScore = board.currentScore;
        }
        board.currentScore = 0;
        board.numCollisions++;
      }
    }
    console.log(board.maxScore);
    console.log(board.currentScore);
    console.log(board.numCollisions);
}




