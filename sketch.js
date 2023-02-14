let source;
let destination;
let pathpath = [];
const s = (p) => {
  class Node {
    //node class for
    constructor(value, adjacents) {
      this.value = value;
      this.adjacents = adjacents; // adjacency list
      this.color = "white";
      this.lineColor = "#000";
      this.lineWeight = 1;
    }
  }
  class Graph {
    constructor() {
      this.nodes = new Map([]);
    }

    addVertex(value) {
      if (this.nodes.has(value)) {
        return this.nodes.get(value);
      } else {
        const vertex = new Node(value, []);
        this.nodes.set(value, vertex);
        return vertex;
      }
    }
    addAdjacent(sourceNode, destinationNode) {
      let source = this.nodes.get(sourceNode);
      let destination;
      if (this.nodes.has(destinationNode)) {
        destination = this.nodes.get(destinationNode);
      } else {
        const vertex = new Node(destinationNode, []);
        this.nodes.set(destinationNode, vertex);
        destination = this.nodes.get(destinationNode);
      }
      if (!source.adjacents.includes(destinationNode)) {
        source.adjacents.push(destinationNode);
      }
      if (!destination.adjacents.includes(sourceNode)) {
        destination.adjacents.push(sourceNode);
      }
      this.nodes.set(sourceNode, source);
      this.nodes.set(destinationNode, destination);
    }
    peek() {
      return this.nodes;
    }
    addLocation(node, location) {
      let value = this.nodes.get(node);
      value.location = location;
    }
  }
  const graph = new Graph();

  let path = [];
  let locations = [];
  let nodes = [];
  let count = 0;

  // Modify shortest path to find all paths leading to destination and make an array for it

  function findPath(list, start, end) {
    let paths = [];
    let visited = new Set();
    let queue = [];
    queue.push([start, [start]]);

    while (queue.length > 0) {
      let [current, path] = queue.shift();
      console.table(queue);
      visited.add(current);
      if (current === end) {
        paths.push(path);
      }
      let currentList = list.get(current).adjacents;
      for (let n = 0; n < list.get(current).adjacents; n++) {
        if (!path.includes(currentList[n])) {
          queue.push([currentList[n], [...path, currentList[n]]]);
        }
      }
    }
    return paths;
  }

  function shortestPath(graphNodes, source, target) {
    var queue = [source],
      visited = { source: true },
      predecessor = {},
      tail = 0;
    while (tail < queue.length) {
      var u = queue[tail++], // Pop a vertex off the queue.
        neighbors = graphNodes.get(u).adjacents;
      for (var i = 0; i < neighbors.length; ++i) {
        var v = neighbors[i];
        if (visited[v]) {
          continue;
        }
        visited[v] = true;
        if (v === target) {
          // Check if the path is complete.
          var pathArray = [v]; // If so, backtrack through the pathArray.
          while (u !== source) {
            pathArray.push(u);
            u = predecessor[u];
          }
          pathArray.push(u);
          console.log(pathArray);
          path = pathArray;
          pathpath.push(pathArray);
          p.colorPaths();
          // return;
        } else {
          predecessor[v] = u;
          queue.push(v);
          console.log(pathArray);
        }
      }
    }
    console.log("there is no path from " + source + " to " + target);
    console.table(pathpath);
  }
  p.setup = function () {
    p.createCanvas(window.innerWidth - 200, window.innerHeight);
    p.frameRate(10);
    p.createLocations(4);
    for (const x of data) {
      const newNode = new Node(x.name, x.links);
      nodes.push(newNode);
    }
    for (const x of nodes) {
      graph.addVertex(x.value);
      for (const r of x.adjacents) {
        graph.addAdjacent(x.value, r);
      }
    }
    graph.peek().forEach((key) => {
      graph.addLocation(key.value, locations[count]);
      count++;
    });
    p.renderDivs(graph.peek());
  };

  p.draw = function () {
    p.background(255);
    p.fill(0);

    graph.peek().forEach((key) => {
      for (let r = 0; r < key.adjacents.length; r++) {
        p.stroke(key.lineColor);
        p.strokeWeight(key.lineWeight);
        p.line(
          key.location.x + 10,
          key.location.y + 10,
          graph.peek().get(key.adjacents[r]).location.x + 10,
          graph.peek().get(key.adjacents[r]).location.y + 10
        );
      }
    });
    if (path.length > 0) p.drawPath();
  };
  p.createLocations = function (divisions) {
    for (let x = 100; x < p.width; x += p.width / divisions) {
      for (let y = 100; y < p.height - 50; y += p.height / divisions) {
        locations.push({ x: x + p.random(-80, 80), y: y + p.random(-80, 80) });
      }
    }
  };
  p.drawPath = function () {
    for (let x = 0; x < path.length - 1; x++) {
      p.stroke(0);
      p.strokeWeight(3);
      p.line(
        graph.peek().get(path[x]).location.x + 10,
        graph.peek().get(path[x]).location.y + 10,
        graph.peek().get(path[x + 1]).location.x + 10,
        graph.peek().get(path[x + 1]).location.y + 10
      );
    }
  };
  p.search = function (node) {
    p.reset();
    let val = graph.peek().get(node);
    if (val.color === "white") {
      val.color = "red";
      val.lineColor = "#6E85F7";
      val.lineWeight = 3;
    }
    graph.peek().set(node, val);
    $(".wrapper").html("");
    p.renderDivs(graph.peek());
  };

  $("#getVal").click(function () {
    source = $("#source").val().toLowerCase();
    destination = $("#destination").val().toLowerCase();
    p.reset();
    console.log(findPath(graph.peek(), source, destination));
    shortestPath(graph.peek(), source, destination);
    p.renderDivs(graph.peek());
  });
  $("#nodeButton").click(function () {
    input = $("#nodes").val().toLowerCase();
    p.reset();
    p.search(input);
    // shortestPath(graph.peek(), source, destination);
  });
  p.renderDivs = function (map) {
    map.forEach((key) => {
      let name = key.value;
      $(".wrapper").append(
        `<div class="hover" onmouseleave="deleteAllImages()" onmouseenter="hoverFn('${name}')" style="position:absolute;width:1.2vw;height:1.2vw;background:black;top:${key.location.y}px;left:${key.location.x}px">
          <p>${key.value}</p>

        </div>`
      );
    });
  };
  p.reset = function () {
    graph.peek().forEach((key) => {
      let value = graph.peek().get(key.value);
      value.lineColor = "#fff";
      value.lineWeight = 0.1;
      value.color = "white";
      graph.peek().set(key.value, value);
      path = [];
    });
  };
  p.colorPaths = function () {
    for (const x of path) {
      let val = graph.peek().get(x);
      if (val.color === "white") {
        val.color = "red";
      }
      graph.peek().set(x, val);
    }
  };
};

function hoverFn(key) {
  let imagesCode = ``;
  let person = data.find((element) => element.name === key);
  console.log(person);

  for (const x of person.images)
    imagesCode += `<img id="imagesCode" src="${x}" style="width: ${
      Math.random() * 50 + 100
    }px; position: fixed; top: ${rn(window.innerHeight - 200)}; left: ${rn(
      window.innerHeight - 200
    )}">`;
  $(".wrapper").append(imagesCode);
}

function deleteAllImages() {
  let imagesToDelete = document.querySelectorAll("#imagesCode");
  for (const x of imagesToDelete) x.remove();
}

function rn(num) {
  return `${Math.random() * num}px`;
}
