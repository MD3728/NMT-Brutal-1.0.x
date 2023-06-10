/* Screen Entrances */

//Crazy Dave Entrance
function daveSetup(){
  transition.trigger = true;
  transition.screen = "daveSpeech";
  screen = "daveSpeech";
  daveIndex = 0;
  initialLevelSetup();
  if (currentLevel.type.includes(3)){//Locked and Loaded
    selectedPackets = currentLevel.givenPlants;
  }
}

//Crazy Dave Loop
function daveLoop(){
  drawStack();
  if (daveIndex >= currentLevel.daveSpeech.length){
    if (currentLevel.type.includes(10)){//Boss 
      selectedPackets = [];
      allPackets = [];
      finalLevelSetup();      
      transition.trigger = true;
      transition.screen = "level";
      screen = "level";
    }else if (currentLevel.type.includes(14)){//I Zombie
      transition.trigger = true;
      transition.screen = "level";
      finalLevelSetup();
      screen = "level";
    }else{//Normal
      chooseSeeds();
    }
  }
  stroke(220);
  fill(230);
  strokeWeight(10);
  rect(450,350,300,180,10);
  fill(0,0,0);
  noStroke();
  textSize(16);
  text(currentLevel.daveSpeech[min(currentLevel.daveSpeech.length-1,daveIndex)], 600, 420);
  textSize(12);
  text("Click to continue", 600, 510);
  translate(300,800);
  scale(6);
  stroke(120,80,40,this.fade);
  strokeWeight(4);
  line(-4,-30,-8,0);
  line(4,-30,8,0);
  line(-6,-48,-15,-24);
  line(6,-48,15,-24);
  noStroke();
  fill(90,60,30,this.fade);
  ellipse(0,-45,18,36);
  fill(150,100,50,this.fade);
  arc(5,-45,10,36,-90,90);
  arc(-5,-45,10,36,90,270);
  fill(240,220,180,this.fade);
  ellipse(0,-75,30,30);
  fill(0,this.fade);
  ellipse(4,-72,4,4);
  ellipse(12,-72,4,4);
  fill(210,this.fade);
  rect(-15,-91,30,13,3);
  rect(-24,-82,24,4);
  scale(1/6);
  translate(-300,800);
}

//Initiate choose your seeds screen
function chooseSeeds(){
  if (currentLevel["type"].includes(3) === true){//Locked and Loaded
    selectedPackets = currentLevel["givenPlants"];
    transition.trigger=true;
    transition.screen="chooseSeeds";
  }else if (currentLevel["type"].includes(2) === true){//Conveyor
    selectedPackets = [];
    transition.trigger=true;
    transition.screen="chooseSeeds";
  }else{//Normal and Other Level Types
    transition.trigger=true;
    transition.screen="chooseSeeds";
    selectedPackets = [];
  }
}

//Loop for Choose Your Seeds
function chooseSeedLoop(){
  //General Looks
  background('rgba(0,0,0,0.15)');
  fill(255,255,255);
  noStroke();
  textSize(30);
  text("Choose Your Plants", width/2, 50);
  textSize(20);
  if ((!currentLevel.type.includes(14))&&(!currentLevel.type.includes(2))){
    text(`Starting Sun: ${sun}`, width/2, 80);
  }

  //Display Zombies In level
  for (let displayingZombie of displayZombies){
    displayingZombie.draw();
  }
  //All Seed Packets
  for (let a = 1; a < 30; a++){
    let buttonX = ((a-1)%5)*150+150;
    let buttonY = floor((a-1)/5)*60+100;
    stroke(200);
    strokeWeight(4);
    fill(180,200,180);
    rect(buttonX, buttonY, 120, 40,3);
    if (((currentLevel["type"].includes(4) === true)&&((a <= 3)||(a === 17)))//Last Stand Ban Sun Producers and Red Stinger AND Ignore Seed Select
    ||(currentLevel.type.includes(2))||(currentLevel.type.includes(3))||(!unlockedPackets.includes(a))){//And Unlocking System
      noStroke();
      fill(0,100);
      rect(buttonX, buttonY, 120, 40,3);
    }
    noStroke();
    fill(0);
    textSize(12);
    text(plantStat[a-1].name, buttonX + 60, buttonY + 20);
  }
  //Start Button
  stroke(200);
  strokeWeight(4);
  fill(180,200,180);
  rect(15,400, 100, 40, 3);
  if (!((currentLevel.type.includes(2))||(currentLevel.type.includes(3)))){
    rect(115,20, 100, 40, 3);
  }
  noStroke();
  fill(0);
  textSize(15);
  textAlign(LEFT,CENTER);
  text('$'+money, 805, 635);
  textAlign(CENTER,CENTER);
  textSize(12);
  text('Start', 65,420);
  if (!((currentLevel.type.includes(2))||(currentLevel.type.includes(3)))){//Prevent Seed Select (Locked and Loaded AND Conveyor)
    textSize(13)
    if(rentSlot){
      text('Rented',165,40);
    }else{
      text('Rent Slot\n1800 Coins',165,40);
    }
    textSize(25);
    if(rentSlot){
      text(selectedPackets.length+'/'+(seedSlots+1),55,40);
    }else{
      text(selectedPackets.length+'/'+seedSlots,55,40);
    }
    for (let currentPacket in selectedPackets){//Selected Seed Packets
      stroke(200);
      strokeWeight(3);
      fill(180,200,180);
      rect(15, currentPacket*40+68, 80, 80/3,2);
      noStroke();
      fill(0);
      textSize(8);
      text(plantStat[selectedPackets[currentPacket]-1].name, 55, currentPacket*40 + 68+40/3);
    }
  }
  //Quit Button
  fill(100);
  stroke(80);
  strokeWeight(5);
  rect(800,30,60,40,5);
  noStroke();
  fill(255,255,255);
  textSize(20);
  text("Quit", 830, 50);
}

//Loop for last stand preparation
function prepareDefense(){
  for (let currentPacket of allPackets){//Get Seed Packets to Correct Position, Set Recharge to Nothing
    currentPacket.recharge = 0;
    currentPacket.move();
  }
  //Clean up dead (shoveled) plant
  for (let c = 0; c < allPlants.length; c++){
    if (allPlants[c].health <= 0){
      for (let currentTile of tiles){
        if (currentTile.plantID === allPlants[c].id){
          currentTile.occupied = false;
          currentTile.plantID = null;
          break;
        }
      }
      allEntities.splice(allEntities.indexOf(allPlants[c]),1);
      allPlants.splice(c,1);
      c--;
    }
  }
  drawStack();
}

//Get Game To Crazy Dave Screen (Or Equivalent)
function initialLevelSetup(){
  //Determine Number of Seed Slots
  seedSlots = unlockedPackets.length > 7 ? 7 : unlockedPackets.length;
  //Create Level Zombie Display
  let zombiesInLevel = [];
  for (let nextWave of currentLevel.waves){
    for (let nextZombie of nextWave){
      if (!zombiesInLevel.includes(nextZombie[0])){
        zombiesInLevel.push(nextZombie[0]);
      }
    }
  }
  //Randomize Array Order (Knuth Shuffle)
  let currentIndex = zombiesInLevel.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0){
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [zombiesInLevel[currentIndex], zombiesInLevel[randomIndex]] = [zombiesInLevel[randomIndex], zombiesInLevel[currentIndex]];
  }
  displayZombies = [];
  for(let a = 0, la = zombiesInLevel.length; a < la; a++){
    displayZombies.push(new Zombie(75+a*40,550-(a%2)*60,0, redirectZombieType(zombiesInLevel[a]),9999,9999,0,0,0,0,0,-1,-1));
    displayZombies[displayZombies.length-1].fade = 255;
  }
  //Reset Variables and Arrays
  waveTimer = 0;
  sunTimer = 180;
  globalTimer = 5;
  conveyorTimer = 1000;//Instantly Spawn Plant In COnveyor Level
  running = true;
  boomberryActive = false;
  boomboxActive = false;
  win = false;
  currentWave = 0;
  currentJam = 0;
  levelSpeed = 1;
  rentSlot = false;
  if (currentLevel["type"].includes(5) === true){//Night Time Sun Bonus 
    sun = 100;
  }else if (currentLevel["type"].includes(14) === true){//I Zombie
    sun = 150;
  }else{//Regular Level
    sun = 75;
  }
  if (currentLevel["startingSun"]){//If starting sun specified OR Last Stand Level
    sun = currentLevel["startingSun"];
  }
  lostPlants = 0;
  allPackets = [];
  allPlants = [];
  allZombies = [];
  allCollectibles = [];
  allEntities = [];
  allProjectiles = [];
  if (currentLevel["type"].includes(14)){//I Zombie
    lawnMowers = [];
    currentJam = currentLevel.jams[0];
  }else{//Normal
    lawnMowers = [
      {x:140, y: 140, active: false},
      {x:140, y: 240, active: false},
      {x:140, y: 340, active: false},
      {x:140, y: 440, active: false},
      {x:140, y: 540, active: false}
    ];
  }
  //Reset Tiles
  tiles = [];
  for (let a = 0; a < 45; a++){
    tiles.push({x: Math.floor(a%9)*80 + 180,
      y: Math.floor(a/9)*100 + 120,
      occupied: false,
      plantID: null,
      color: a%2,
    id:a});
  }
  //Set Up Boss
  if (currentLevel["type"].includes(10) === true){
    bossDamage = 0;
    //Spawn Zombies to take damage for boss
    new Zombie(665, 120, 1, 24, 10000000, 0, [], 0, 0, 0, 0, -1, 0, 0);
    new Zombie(665, 220, 2, 24, 10000000, 0, [], 0, 0, 0, 0, -1, 0, 0);
    new Zombie(665, 320, 3, 24, 10000000, 0, [], 0, 0, 0, 0, -1, 0, 0);
    new Zombie(665, 420, 4, 24, 10000000, 0, [], 0, 0, 0, 0, -1, 0, 0);
    new Zombie(665, 520, 5, 24, 10000000, 0, [], 0, 0, 0, 0, -1, 0, 0);
  }
  //Create Endangered Plants
  if (currentLevel["type"].includes(6) === true){
    for (let nextPlant of currentLevel["endangeredPlant"]){//Format is [plant type, tier, tile number]
      for (let currentTileNumber in tiles){//Find correct tile
        if (parseInt(currentTileNumber) + 1 === nextPlant[2]){//Tile number is 1 -> 45
          let currentTile = tiles[currentTileNumber];
          let newPlant = createPlant(nextPlant[0], nextPlant[1], currentTile.x + 10, currentTile.y + 10);
          newPlant.endangered = true;
          currentTile.occupied = true;
          currentTile.plantID = newPlant.id;
          break;
        }
      }
    }
  }
  //Create I Zombie Plants
  if (currentLevel["type"].includes(14) === true){
    let finalLayout = [];
    let uninitializedLayout = currentLevel["startingRandomPlants"];
    let randomizedLayout = [];
    //Create Array of Plants
    for (let b = 0; b < uninitializedLayout.length; b++){
      for (let c = 0; c < uninitializedLayout[b][2]; c++){
        randomizedLayout.push([uninitializedLayout[b][0],uninitializedLayout[b][1]]);
      }
    }
    //Randomize Array Order (Knuth Shuffle)
    let currentIndex = randomizedLayout.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0){
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [randomizedLayout[currentIndex], randomizedLayout[randomIndex]] = [randomizedLayout[randomIndex], randomizedLayout[currentIndex]];
    }
    //Format Plants
    let boardWidth = (currentLevel.plantLine-180)/80;
    for (let a = 0; a < boardWidth*5; a++){
      finalLayout.push([randomizedLayout[a][0], randomizedLayout[a][1], (Math.floor(a/boardWidth))*9 + a%boardWidth + 1]);
    }
    //Add (Create) Plants To Tiles
    for (let nextPlant of finalLayout){//Format of "nextPlant" is [plant type, tier, tile number]
      for (let currentTileNumber in tiles){//Find correct tile
        if (parseInt(currentTileNumber) + 1 === nextPlant[2]){//Tile number is 1 -> 45
          let currentTile = tiles[currentTileNumber];
          currentTile.occupied = true;
          let newPlant = createPlant(nextPlant[0], nextPlant[1], currentTile.x + 10, currentTile.y + 10);
          currentTile.plantID = newPlant.id;
          break;
        }
      }
    }
  }
  //Create Seed Packets
  if (currentLevel["type"].includes(3) === true){//Locked and Loaded
    if (currentLevel["type"].includes(14)){//I Zombie
      for (let currentPacket of currentLevel.givenPlants){
        for (let currentZombieNum in zombieStat){//Find correct plant
          let currentZombie = zombieStat[currentZombieNum];
          if (currentZombie["type"] === currentPacket[0]){//Find type
            let newPacket = new SeedPacket(currentPacket[0], currentZombie.name, currentZombie.sun, 1, 0, 0, false, true);
            newPacket.move();
          }
        }
      }
    }else{//Normal
      for (let currentPacket of currentLevel.givenPlants){
        for (let currentPlantNum in plantStat){//Find correct plant
          let currentPlant = plantStat[currentPlantNum];
          if (currentPlant["type"] === currentPacket[0]){//Find type
            if (currentPacket[1] === 1){//Tier 1
              let tier1Stat = currentPlant["t1"];
              let newPacket = new SeedPacket(currentPacket[0], currentPlant["name"], tier1Stat["sun"], 1, tier1Stat["recharge"], tier1Stat["startingRecharge"]);//Tier 1
              newPacket.move();
            }else{//Tier 2
              let tier2Stat = currentPlant["t2"];
              let newPacket = new SeedPacket(currentPacket[0], currentPlant["name"], tier2Stat["sun"], 2, tier2Stat["recharge"], tier2Stat["startingRecharge"]);//Tier 2
              newPacket.move();
            }
          }
        }
      }
    }
  }
}

//Function to call when starting level AFTER Crazy Dave
function finalLevelSetup(){
  if ((!currentLevel["type"].includes(2))&&(!currentLevel.type.includes(14))){//Other Level Types With Choose Your Seeds But No Conveyor
    for (let a in selectedPackets){
      let packetID = selectedPackets[a];
      for (let currentPlantNum in plantStat){//Find correct plant
        let currentPlant = plantStat[currentPlantNum];
        if (currentPlant["type"] === packetID){
          if (plantTier[packetID - 1] === 1){//Tier 1
            let tier1Stat = currentPlant["t1"];
            new SeedPacket(packetID, currentPlant["name"], tier1Stat["sun"], 1, tier1Stat["recharge"], tier1Stat["startingRecharge"]);//Tier 1
          }else{//Tier 2
            let tier2Stat = currentPlant["t2"];
            new SeedPacket(packetID, currentPlant["name"], tier2Stat["sun"], 2, tier2Stat["recharge"], tier2Stat["startingRecharge"]);//Tier 2
          }
        }
      }
    }
  }
  if (!currentLevel["type"].includes(14)){//Create shovel if not I Zombie
    new SeedPacket("shovel", "Shovel", 0, 0, 0, 0);
  }
}

//Start game from choose your seeds
function startGame(){
  transition.trigger = true;
  transition.screen = "level";
  if (currentLevel["type"].includes(4) === false){//Not Last Stand
    finalLevelSetup();
  }
}
