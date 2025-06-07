

cardindexnames = ["error","slap","punch","stab"];
cardindexeffects = ["error","dmg:10,bleed:1","dmg:15","dmg:5,bleed:3"];



hand = ["error","slap","punch","stab"];


function cast(card) {
  
  i = 1;
  while hand [card] != cardindexnames[i] {
    i++
  }
  document.getElementById("name").innerHTML = cardindexnames [i];
  document.getElementById("chosen").innerHTML = hand [i];
  document.getElementById("fullhand").innerHTML = hand [1] + hand [2] + hand [3];
  document.getElementById("eye").innerHTML = i;
  hand [card] = "";
}
