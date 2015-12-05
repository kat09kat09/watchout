// start slingin' some d3 here.

var Board = function () {
    this.x = 700;
    this.y = 700;
    this.numEnemies = 30;
    this.padding = 20;
    this.score = 0;
    this.maxScore = 0;
    this.numCollisions = 0;

};


var board = new Board();

var enemies = function () {
    var arrOfEnemies = [];
  for (var i = 0; i < board.numEnemies; i++) {
      arrOfEnemies.push(i);
  }
    return arrOfEnemies;
};

var allEnemies = enemies();


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

var player = gameBoard.append('rect')
                    .attr('class', 'player')
                    .style('fill', 'red')
                    .style('stroke', 'red')
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('x', 350)
                    .attr('y', 350);

var cb= function () {
  gameBoard.selectAll("circle").transition()
      //.each(function() {
      //  d3.select(this)
      //    .style('fill', 'blue')
      //    .style('stroke', 'blue')
      //    .style('r', 10)
      //    .attr('cx', function () {return Math.random () * 699})
      //    .attr('cy', function () {return Math.random () * 699});
      //})
     .style('fill', 'blue')
     .style('stroke', 'blue')
     .style('r', 10)
     .attr('cx', function () {return Math.random () * 699})
     .attr('cy', function () {return Math.random () * 699});
 };

setInterval (cb, 1000);

//var drag = d3.behavior.drag();
var drag = d3.behavior.drag()
    .on("drag", function(d,i) {
        d.x += d3.event.dx
        d.y += d3.event.dy
        d3.select(this).attr("transform", function(d,i){
            return "translate(" + [ d.x,d.y ] + ")"
        })
    });
// d3.selectAll('.player').call(drag);

//gameBoard.selectAll("circle").transition()
    // d3.timer(function() {

    //     gameBoard.selectAll("circle").transition()
    //      .delay(1000)

    //      .style('fill', 'blue')
    //      .style('stroke', 'blue')
    //      .style('r', 10)
    //      .attr('cx', function () {return Math.random () * 699})
    //      .attr('cy', function () {return Math.random () * 699});
    // }, 1000);


