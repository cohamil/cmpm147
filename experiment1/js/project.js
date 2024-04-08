// project.js - purpose and description here
// Author: Connor Hamilton
// Date: 4/7/2024

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    pre: ["Sword", "Staff", "Helm", "Chestplate", "Leggings", "Boots", "Axe", "Necklace", "Bracelet", "Crown", "Gloves", "Ring", "Wand", "Flail", "Rapier", "Shield", "Bow", "Crossbow", "Dagger", "Spear", "Mace"],
    post: ["Power", "Suffering", "Poison", "Death", "Protection", "Beauty", "Disgust", "Fame", "Fortune", "Wealth", "Ignorance", "Incompetence", "Fire", "Water", "Earth", "Air", "Blood", "Hardship", "Success", "Failure"],
    ab1: ["kill anything instantly", "inflict Bleed", "turn invisible", "use telekinesis", "shoot fireballs", "shoot ice", "not move", "not speak", "not see", "not breath", "not touch water", "teleport", "revive once after death", "lift up to a ton", "stop time"],
    ab2: ["change the weather", "not take damage without dying", "heal over time", "talk telepathically", "read people's thoughts", "talk to animals", "inflict poison", "shoot air blasts", "not hear anything", "not get drunk", "not find love", "not take the item off"],
    reaction: ["excited", "disgusted", "unnerved", "amused", "enthralled", "honored", "aroused", "amazed", "disappointed", "furious", "embarrased", "pleased", "tormented"],
    item: ["banana slug", "mushroom", "golden egg", "lightning in a bottle", "severed hand", "skull", "million dollars", "pufferfish", "diary of the demon king", "ford f150"],
    action: ["Slay", "Eat", "Make love with", "Group up with", "Marry", "Party with", "Have a political argument with", "Play games with"],
    thing: ["Demon Queen", "Dragon of Darkness", "King of the Dwarves", "Honored One", "Gods", "entire world", "Demon of Death", "Queen of Nature"],
  };
  
  const template = `After defeating the demon king, you have saved the world and have now earned your treasure. You notice a chest and open it with excitement, discovering:
  
  The $pre of $post
  Ability: With this item equipped, you can $ab1 and can $ab2.
  
  You are $reaction with the possibility of using this item. Additionally, you find a $item inside the chest.
  With the loot from the chest, you are now determined to accomplish your next goal:
  
  $action the $thing
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  
}

// let's get this party started - uncomment me
main();