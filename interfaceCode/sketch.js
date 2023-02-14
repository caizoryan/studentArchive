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
      this.lineColor = "#fff";
      this.lineWeight = 0.1;
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
  let data = [
    { name: "3d modelling", links: ["design"] },
    { name: "a hacker manifesto", links: ["philosophy", "reading"] },
    { name: "adobe", links: ["tools", "software"] },
    { name: "advertising", links: ["commercial design"] },
    { name: "ai art", links: ["software", "art"] },
    { name: "anime", links: ["media", "animation"] },
    { name: "art history", links: ["history", "art"] },
    { name: "art techniques", links: ["art"] },
    { name: "asl", links: ["language"] },
    { name: "baking", links: ["cooking"] },
    { name: "basketball", links: ["sports"] },
    { name: "biomedical communications", links: ["biology"] },
    { name: "board games", links: ["game design"] },
    { name: "book cover design", links: ["print", "design"] },
    { name: "branding", links: ["commercial design"] },
    { name: "budgeting", links: ["finance"] },
    { name: "c.s. lewis", links: ["reading"] },
    { name: "cars", links: ["sports"] },
    { name: "cartoon", links: ["illustration"] },
    { name: "cats", links: ["animals"] },
    { name: "character animation", links: ["animation"] },
    { name: "children’s book illustration", links: ["illustration"] },
    { name: "chisel", links: ["music"] },
    { name: "coding", links: ["technology"] },
    { name: "coffee", links: ["culture"] },
    { name: "collaborative publication", links: ["publication", "writing"] },
    { name: "comic", links: ["illustration", "reading"] },
    { name: "communication", links: ["language"] },
    { name: "community", links: ["culture"] },
    { name: "computer graphics", links: ["technology", "design"] },
    { name: "conceptual art and design", links: ["art", "design"] },
    { name: "consciousness", links: ["psychology"] },
    { name: "conversation", links: ["community", "web", "language"] },
    { name: "cooking", links: ["culture", "history"] },
    { name: "craft beer", links: ["culture"] },
    { name: "css", links: ["coding"] },
    { name: "cyberpunk", links: ["video games"] },
    { name: "dance", links: ["culture", "sports"] },
    { name: "digital art", links: ["art", "technology"] },
    { name: "dogs", links: ["animals"] },
    { name: "drawing", links: ["illustration"] },
    { name: "economics", links: ["finance"] },
    { name: "exchange rate", links: ["finance"] },
    { name: "family language", links: ["language", "culture"] },
    { name: "fashion", links: ["design"] },
    { name: "file types", links: ["technology"] },
    { name: "filmmaking", links: ["film"] },
    { name: "freelancing", links: ["design"] },
    { name: "french", links: ["language"] },
    { name: "game design", links: ["design", "video games"] },
    { name: "gardening", links: ["community"] },
    { name: "greek mythology", links: ["history", "mythology"] },
    { name: "greek", links: ["language"] },
    { name: "green energy", links: ["sustainibility"] },
    { name: "greenwashing", links: ["sustainibility"] },
    { name: "guitar", links: ["music"] },
    { name: "gym", links: ["sports"] },
    { name: "halloween", links: ["culture"] },
    { name: "hand lettering", links: ["typography"] },
    { name: "health care", links: ["biology"] },
    { name: "horror", links: ["film", "art"] },
    { name: "how to not procrastinate", links: ["psychology"] },
    { name: "html", links: ["language", "coding"] },
    { name: "human anatomy", links: ["drawing", "biology"] },
    { name: "human consciousness", links: ["psychology"] },
    { name: "ice skating", links: ["sports"] },
    { name: "immune boosting", links: ["biology", "health"] },
    { name: "inflation", links: ["history", "finance"] },
    { name: "infographic design", links: ["design", "data"] },
    { name: "interest rate", links: ["finance"] },
    { name: "interior design", links: ["design"] },
    { name: "job hunting", links: ["community"] },
    { name: "keshi", links: ["music"] },
    { name: "kpop", links: ["music"] },
    { name: "liminal space", links: ["design"] },
    { name: "livestreams", links: ["media"] },
    { name: "macedonian", links: ["language"] },
    { name: "macro economics", links: ["finance"] },
    { name: "making jewelry", links: ["art"] },
    { name: "manga", links: ["reading", "illustration"] },
    { name: "marine biology", links: ["biology"] },
    { name: "medicine", links: ["biology"] },
    { name: "mental health", links: ["psychology"] },
    { name: "motion design", links: ["design", "animation"] },
    { name: "mould making", links: ["art"] },
    { name: "nail polish", links: ["fashion"] },
    { name: "natural world", links: ["art"] },
    { name: "networking", links: ["communication"] },
    { name: "painting", links: ["art"] },
    { name: "nft", links: ["technology", "art"] },
    { name: "non caucasian literature", links: ["reading"] },
    { name: "origin of universe", links: ["philosophy"] },
    { name: "package design", links: ["design"] },
    { name: "photography", links: ["art", "design"] },
    { name: "piano", links: ["music"] },
    { name: "pop", links: ["music"] },
    { name: "portfolio", links: ["web", "design"] },
    { name: "portrait painting", links: ["painting"] },
    { name: "poster design", links: ["design"] },
    { name: "3d modelling", links: ["design"] },
    { name: "a hacker manifesto", links: ["philosophy", "reading"] },
    { name: "adobe", links: ["tools", "software"] },
    { name: "advertising", links: ["commercial design"] },
    { name: "ai art", links: ["software", "art"] },
    { name: "anime", links: ["media", "animation"] },
    { name: "art history", links: ["history", "art"] },
    { name: "art techniques", links: ["art"] },
    { name: "asl", links: ["language"] },
    { name: "baking", links: ["cooking"] },
    { name: "basketball", links: ["sports"] },
    { name: "biomedical communications", links: ["biology"] },
    { name: "board games", links: ["game design"] },
    { name: "book cover design", links: ["print", "design"] },
    { name: "branding", links: ["commercial design"] },
    { name: "budgeting", links: ["finance"] },
    { name: "c.s. lewis", links: ["reading"] },
    { name: "cars", links: ["sports"] },
    { name: "cartoon", links: ["illustration"] },
    { name: "cats", links: ["animals"] },
    { name: "character animation", links: ["animation"] },
    { name: "children’s book illustration", links: ["illustration"] },
    { name: "chisel", links: ["music"] },
    { name: "coding", links: ["technology"] },
    { name: "coffee", links: ["culture"] },
    { name: "collaborative publication", links: ["publication", "writing"] },
    { name: "comic", links: ["illustration", "reading"] },
    { name: "communication", links: ["language"] },
    { name: "community", links: ["culture"] },
    { name: "computer graphics", links: ["technology", "design"] },
    { name: "conceptual art and design", links: ["art", "design"] },
    { name: "consciousness", links: ["psychology"] },
    { name: "conversation", links: ["community", "web", "language"] },
    { name: "cooking", links: ["culture", "history"] },
    { name: "craft beer", links: ["culture"] },
    { name: "css", links: ["coding"] },
    { name: "cyberpunk", links: ["video games"] },
    { name: "dance", links: ["culture", "sports"] },
    { name: "digital art", links: ["art", "technology"] },
    { name: "dogs", links: ["animals"] },
    { name: "drawing", links: ["illustration"] },
    { name: "economics", links: ["finance"] },
    { name: "exchange rate", links: ["finance"] },
    { name: "family language", links: ["language", "culture"] },
    { name: "fashion", links: ["design"] },
    { name: "file types", links: ["technology"] },
    { name: "filmmaking", links: ["film"] },
    { name: "freelancing", links: ["design"] },
    { name: "french", links: ["language"] },
    { name: "game design", links: ["design", "video games"] },
    { name: "gardening", links: ["community"] },
    { name: "greek mythology", links: ["history", "mythology"] },
    { name: "greek", links: ["language"] },
    { name: "green energy", links: ["sustainibility"] },
    { name: "greenwashing", links: ["sustainibility"] },
    { name: "guitar", links: ["music"] },
    { name: "gym", links: ["sports"] },
    { name: "halloween", links: ["culture"] },
    { name: "hand lettering", links: ["typography"] },
    { name: "health care", links: ["biology"] },
    { name: "horror", links: ["film", "art"] },
    { name: "how to not procrastinate", links: ["psychology"] },
    { name: "html", links: ["language", "coding"] },
    { name: "human anatomy", links: ["drawing", "biology"] },
    { name: "human consciousness", links: ["psychology"] },
    { name: "ice skating", links: ["sports"] },
    { name: "immune boosting", links: ["biology", "health"] },
    { name: "inflation", links: ["history", "finance"] },
    { name: "infographic design", links: ["design", "data"] },
    { name: "interest rate", links: ["finance"] },
    { name: "interior design", links: ["design"] },
    { name: "job hunting", links: ["community"] },
    { name: "keshi", links: ["music"] },
    { name: "kpop", links: ["music"] },
    { name: "liminal space", links: ["design"] },
    { name: "livestreams", links: ["media"] },
    { name: "macedonian", links: ["language"] },
    { name: "macro economics", links: ["finance"] },
    { name: "making jewelry", links: ["art"] },
    { name: "manga", links: ["reading", "illustration"] },
    { name: "marine biology", links: ["biology"] },
    { name: "medicine", links: ["biology"] },
    { name: "mental health", links: ["psychology"] },
    { name: "motion design", links: ["design", "animation"] },
    { name: "mould making", links: ["art"] },
    { name: "nail polish", links: ["fashion"] },
    { name: "natural world", links: ["art"] },
    { name: "networking", links: ["communication"] },
    { name: "painting", links: ["art"] },
    { name: "nft", links: ["technology", "art"] },
    { name: "non caucasian literature", links: ["reading"] },
    { name: "origin of universe", links: ["philosophy"] },
    { name: "package design", links: ["design"] },
    { name: "photography", links: ["art", "design"] },
    { name: "piano", links: ["music"] },
    { name: "pop", links: ["music"] },
    { name: "portfolio", links: ["web", "design"] },
    { name: "portrait painting", links: ["painting"] },
    { name: "poster design", links: ["design"] },
  ];
  let locations = [];
  let nodes = [];
  let count = 0;

  // Modify shortest path to find all paths leading to destination and make an array for it

  function maximumOverlap(graphNodes, source, target) {
    var queue = [source],
      visited = { source: true },
      predecessor = {},
      tail = 0;
    while (tail < queue.length) {
      var u = queue[tail++], // Pop a vertex off the queue.
        neighbors = graphNodes.get(u).adjacents;
      console.log(queue);
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
          p.colorPaths();
          return;
        } else {
          predecessor[v] = u;
          queue.push(v);
          console.log(pathArray);
        }
      }
    }
    console.log("there is no path from " + source + " to " + target);
  }
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
    p.createLocations(15);
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
    p.background(0);
    p.fill(255);

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
        locations.push({ x: x + p.random(-20, 20), y: y + p.random(-20, 20) });
      }
    }
  };
  p.drawPath = function () {
    for (let x = 0; x < path.length - 1; x++) {
      p.stroke(255);
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
      $(".wrapper").append(
        `<div class="hover" onmouseenter="hoverFn()" style="position:absolute;width:1.2vw;height:1.2vw;background:${key.color};top:${key.location.y}px;left:${key.location.x}px">
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

let myp5 = new p5(s, "container");

function hoverFn() {
  console.log("ok");
  // display images of the person
}
