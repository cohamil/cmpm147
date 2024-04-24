// sketch.js - Overworld/Dungeon generator and editor, with random biome/room generation.
// Author: Connor Hamilton
// Date: 4/23/2024

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

let seed2 = 0;
let tilesetImage2;
let currentGrid2 = [];
let numRows2, numCols2;

var myp5 = new p5((d) => {
  d.preload = () => {
    tilesetImage = d.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  }
  
  function reseed() {
    seed = (seed | 0) + 1109;
    d.randomSeed(seed);
    d.noiseSeed(seed);
    d.select("#seedReport").html("seed " + seed);
    regenerateGrid();
  }
  
  function regenerateGrid() {
    d.select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
    reparseGrid();
  }
  
  function reparseGrid() {
    currentGrid = stringToGrid(d.select("#asciiBox").value());
  }
  
  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }
  
  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }
  
  d.setup = () => {
    numCols = d.select("#asciiBox").attribute("rows") | 0;
    numRows = d.select("#asciiBox").attribute("cols") | 0;
  
    d.createCanvas(16 * numCols, 16 * numRows).parent("canvas-container1");
    d.select('canvas').elt.getContext("2d").imageSmoothingEnabled = false;
  
    d.select("#reseedButton").mousePressed(reseed);
    d.select("#asciiBox").input(reparseGrid);
  
    reseed();
    };

    d.draw = () => {
      d.randomSeed(seed);
      drawGrid(currentGrid);
    }
  
  function placeTile(i, j, ti, tj) {
    d.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }

  const codes = {
    underscore: "_",    // background
    period: ".",        // room ground
    line: "|",          // wall
    hash: "#",          // chest
    tilda: "~"          // water
  };
  
  
  const lookup = [
    [21,11],     // no target
    [21,11],     // no west/east/south targets
    [21,11],     // no west/east/north targets    
    [21,11],     // no west/east targets
    [21,11],     // no east/north/south targets
    [21,11],     // no east/south targets
    [21,11],     // no east/north targets
    [21,11],     // no east target
    [21,11],     // no north/south/west targets
    [21,11],     // no west/south targets
    [21,11],     // no west/north targets
    [21,11],     // no west target
    [21,11],     // no north/south targets
    [21,11],     // no south target
    [21,11],     // no north target
    [0,0]      // all targets
  ];
  
  
  // If location i,j is inside the grid (not out of bounds), does grid[i][j]==target? Otherise, return false.
  function gridCheck(grid, i, j, target) {
    if (i >= 0 && j >= 0 && i < grid.length && j < grid[0].length) {
      return grid[i][j]==target;
    }
    return false;
  }
  
  // Form a 4-bit code using gridCheck on the north/south/east/west neighbors of i,j for the target code
  function gridCode(grid, i, j, target) {
    // Generate bitcode based on grid check of adjacent cells
    let bitCode = 
        (gridCheck(grid, i - 1, j, target) << 0) + 
        (gridCheck(grid, i + 1, j, target) << 1) + 
        (gridCheck(grid, i, j - 1, target) << 2) + 
        (gridCheck(grid, i, j + 1, target) << 3);
    
    return bitCode;
  }
  
  // Get the code for this location and target. Use the code as an array index to get a pair of tile offset numbers
  function drawContext(grid, i, j, target, ti, tj) {
    let [tiOffset, tjOffset] = [];
    let code = gridCode(grid, i, j, target);
    
    if (target == "_" && code != lookup.length - 1) {
      [tiOffset, tjOffset] = [21, 11];
    }
    else {
      [tiOffset, tjOffset] = lookup[code];
    }
    
    
    if (code != lookup.length - 1) {
      let buf = d.floor(d.random(0, 3));
      buf += buf >= 1 ? 1 : 0;
      placeTile(i, j, ti + tiOffset, tj + tjOffset + buf);
    }
    else {
      placeTile(i, j, ti + tiOffset, tj + tjOffset);
    }
  }
  
  
  class Room {
    // Room constructor, chestPos default set to not spawn unless changed
    constructor(x, y, width, height, chestPos = [-1,-1]) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.chestPos = chestPos;
    }
    
    // Method to check if a point is inside the room
    contains(x, y) {
      return (x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height);
    }
    
    // Method to get the center of the room
    center() {
      return [this.x + d.floor(this.width / 2), this.y + d.floor(this.height / 2)];
    }
  }
  
  
  // Recursive function to spawn water tiles in a room
  function spawnWater(grid, x, y, room) {
    if (!room.contains(x, y) || grid[x][y] !== codes.period) {
      return;
    }
  
    grid[x][y] = codes.tilda; // Set the tile to water
  
    // Recursively spawn water in adjacent tiles
    spawnWater(grid, x - 1, y, room);
    spawnWater(grid, x + 1, y, room);
    spawnWater(grid, x, y - 1, room);
    spawnWater(grid, x, y + 1, room);
  }
  
  function generateGrid(numCols, numRows) {
    let grid = [];
    let rooms = [];
    
    // Generate rooms
    for (let i = 0; i < d.floor(d.random(4, 8)); i++) {
      let x = d.floor(d.random(numRows - 5) + 1);
      let y = d.floor(d.random(numCols - 5) + 1);
      let width = d.floor(d.random(3, 6)); // Random width between 3 and 6
      let height = d.floor(d.random(3, 6)); // Random height between 3 and 6
      
      let chestPos;
      // Random chance to generate chest
      if (d.random() < 0.3) {
        chestPos = [d.floor(d.random(1, width)), d.floor(d.random(1, height))];
      }
      
      rooms.push(new Room(x, y, width, height, chestPos));
    }
    
    // Generate grid
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        let insideRoom = false;
        
        // Check if inside any room
        for (let room of rooms) {
          if (room.contains(i, j)) {
            insideRoom = true;
            break;
          }
        }
        
        if (insideRoom) {
          row.push(codes.period); // Inside room
        } else {
          row.push(codes.underscore); // Outside room
        }
      }
      grid.push(row);
    }
    
    // Add water to rooms
    for (let room of rooms) {
      let waterChance = d.random(); // Chance of water spawning in the room
      if (waterChance < 0.3) { // Adjust this value to change the probability of water spawning
        let [centerX, centerY] = room.center();
        spawnWater(grid, centerX, centerY, room);
      }
    }
    
    
    // Connect rooms with hallways
    for (let i = 0; i < rooms.length - 1; i++) {
      let currentRoom = rooms[i].center();
      let nextRoom = rooms[i + 1].center();
      let [currentX, currentY] = currentRoom;
      let [nextX, nextY] = nextRoom;
      
      // Connect horizontally
      for (let x = d.min(currentX, nextX); x <= d.max(currentX, nextX); x++) {
        grid[x][currentY] = codes.period;
      }
      
      // Connect vertically
      for (let y = d.min(currentY, nextY); y <= d.max(currentY, nextY); y++) {
        grid[nextX][y] = codes.period;
      }
    }
    
    // Add chests to grid
    for (let room of rooms) {
      let [chestXPos, chestYPos] = room.chestPos;
      if (chestXPos != -1 && chestYPos != -1) {
        grid[room.x + chestXPos][room.y + chestYPos] = codes.hash;
      }
    }
    
    return grid;
  }
  
  
  function drawGrid(grid) {
    d.background(128);
  
    let t = d.millis() / 1500.0;
    
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        let tile = grid[i][j];
        // Background renderer
        if (tile == '_') {
          //placeTile(i, j, 0, 10);
          drawContext(grid, i, j, '_', 0, 10)
        }
        // Wall renderer
        else if (tile == '|') {
          placeTile(i, j, 21, 21);
        }
        // Dungeon ground renderer
        else if (tile == '.') {
          if (i == grid.length - 1 || j == grid[i].length - 1) {
            placeTile(i, j, 21, 21);
          } else {
            placeTile(i, j, (d.floor(d.random(4))), 16);
          }
        }
        // Chest renderer
        else if (tile == '#') {
          if (i == grid.length - 1 || j == grid[i].length - 1) {
            placeTile(i, j, 21, 21);
          } else {
            placeTile(i, j, 5, 29);
          }
        }
        // Water renderer
        else if (tile == '~') {
          if (i == grid.length - 1 || j == grid[i].length - 1) {
            placeTile(i, j, 21, 21);
          } else {
            placeTile(i, j, (4 * d.pow(d.noise(t / 10, i, j / 4 + t), 2)) | 0, 14);
          }
        }
      }
    }
    
  }
}, 'p5sketch');

var myp5 = new p5((o) => {
  o.preload = () => {
    tilesetImage2 = o.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  }

  function reseed2() {
    seed2 = (seed2 | 0) + 1109;
    o.randomSeed(seed2);
    o.noiseSeed(seed2);
    o.select("#seedReport2").html("seed " + seed2);
    regenerateGrid22();
  }
  
  function regenerateGrid22() {
    o.select("#asciiBox2").value(gridToString2(generateGrid2(numCols2, numRows2)));
    reparseGrid2();
  }
  
  function reparseGrid2() {
    currentGrid2 = stringToGrid2(o.select("#asciiBox2").value());
  }
  
  function gridToString2(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }
  
  function stringToGrid2(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }
  
  o.setup = () => {
    numCols2 = o.select("#asciiBox2").attribute("rows") | 0;
    numRows2 = o.select("#asciiBox2").attribute("cols") | 0;
  
    o.createCanvas(16 * numCols2, 16 * numRows2).parent("canvas-container2");
    o.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;
  
    o.select("#reseedButton2").mousePressed(reseed2);
    o.select("#asciiBox2").input(reparseGrid2);
  
    reseed2();
    };
  
    o.draw = () => {
      o.randomSeed(seed2);
      drawGrid2(currentGrid2);
    }
  
  function placeTile2(i, j, ti, tj) {
    o.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }


  const codes2 = {
    underscore: "_",    // dark grass
    period: ".",        // light grass
    line: "|",          // dirt
    hash: "#",          // chest
    tilda: "~",         // water
    carrot: "^"         // flower
  };
  
  const lookup2 = [
    [0,0],       // no target
    [0,1],       // no west/east/south targets
    [0,-1],      // no west/east/north targets
    [0,0],       // no west/east targets
    [0,-1],      // no east/north/south targets
    [1,1],       // no east/south targets
    [1,-1],      // no east/north targets
    [1,0],       // no east target
    [0,-1],      // no north/south/west targets
    [-1,1],      // no west/south targets
    [-1,-1],     // no west/north targets
    [-1,0],      // no west target
    [0,0],       // no north/south targets
    [0,1],       // no south target
    [0,-1],      // no north target
    [0,0]        // all targets
  ];
  
  
  // If location i,j is inside the grid (not out of bounds), does grid[i][j]==target? Otherise, return false.
  function gridCheck2(grid, i, j, target) {
    if (i >= 0 && j >= 0 && i < grid.length && j < grid[0].length) {
      return grid[i][j]==target;
    }
    return false;
  }
  
  // Form a 4-bit code using gridCheck2 on the north/south/east/west neighbors of i,j for the target code
  function gridCode2(grid, i, j, target) {
    // Generate bitcode based on grid check of adjacent cells
    let bitCode = 
        (gridCheck2(grid, i - 1, j, target) << 0) + 
        (gridCheck2(grid, i + 1, j, target) << 1) + 
        (gridCheck2(grid, i, j - 1, target) << 2) + 
        (gridCheck2(grid, i, j + 1, target) << 3);
    
    return bitCode;
  }
  
  // Get the code for this location and target. Use the code as an array index to get a pair of tile offset numbers
  function drawContext2(grid, i, j, target, ti, tj) {
    let [tiOffset, tjOffset] = [];
    let code = gridCode2(grid, i, j, target);
    
    if (target == "_" && code != lookup2.length - 1) {
      [tiOffset, tjOffset] = [21, 11];
    }
    else {
      [tiOffset, tjOffset] = lookup2[code];
    }
    
    
    placeTile2(i, j, ti + tiOffset, tj + tjOffset);
  }
  
  
  function generateGrid2(numCols, numRows) {
    let grid = [];
    let currentCode;
    
    let flowerPatchProbability = 0.03;
    
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        
        let pNoise = o.noise(i / 20, j / 20);
        
        if (pNoise < 0.4) {
          currentCode = codes2.tilda;
        }
        else if (pNoise < 0.45) {
          currentCode = codes2.line;
        }
        else if (pNoise < 0.53) {
          currentCode = codes2.period;
        }
        else {
          currentCode = codes2.underscore;
        }
        
        row.push(currentCode);
      }
      grid.push(row);
    }
  
    
    // Assign flower patches after creating the grid
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        // Check if a random number is below the probability threshold
        if (grid[i][j] === codes2.underscore && o.random() < flowerPatchProbability) {
          // Add a flower patch
          const patchSize = o.floor(o.random(1, 4)); // Random patch size between 1 and 3
          const startX = i - o.floor(patchSize / 2); // Start X coordinate for the patch
          const startY = j - o.floor(patchSize / 2); // Start Y coordinate for the patch
  
          // Loop through the patch area and reassign flower tiles
          for (let x = startX; x < startX + patchSize; x++) {
            for (let y = startY; y < startY + patchSize; y++) {
              // Check if the current position is within the grid bounds
              if (x >= 0 && x < numRows && y >= 0 && y < numCols && grid[x][y] === codes2.underscore) {
                // Reassign the current cell with a flower tile
                grid[x][y] = codes2.carrot;
              }
            }
          }
        }
      }
    }
    
    return grid;
  }
  
  
  function drawGrid2(grid) {
    o.background(128);
  
    let t = o.millis() / 1500.0;
    
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        let tile = grid[i][j];
        // Water renderer
        if (tile == '~') {
          placeTile2(i, j, (4 * o.pow(o.noise(t / 10, i, j / 4 + t), 2)) | 0, 13);
          drawContext2(grid, i, j, '~', 10, 4)
        
        }
        // Dirt renderer
        else if (tile == '|') {
          placeTile2(i, j, 0, 3);
        }
        // Light Grass renderer
        else if (tile == '.') {
          placeTile2(i, j, (o.floor(o.random(4))), 0);
        }
        // Dark Grass renderer
        else if (tile == '_') {
          placeTile2(i, j, (o.floor(o.random(4))), 1);
        }
        // Flower renderer
        else if (tile == '^') {
          placeTile2(i, j, 22, 1);
        }
        
      }
    }
    
  }
}, 'p5sketch');