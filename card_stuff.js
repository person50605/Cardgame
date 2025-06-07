

cardindexnames = ["error","slap","punch","stab"];
cardindexeffects = ["error","dmg:10,bleed:1","dmg:15","dmg:5,bleed:3"];



hand = ["error","slap","punch","stab"];


function cast(card) {
  
  i = 1
  while hand [card] != cardindexnames[i] {
    i++
  }
  
  hand [card] = "";
}
