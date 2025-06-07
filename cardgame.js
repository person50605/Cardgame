import random
import array
import string
import math

//More weight means more likely to spawn in a shop or randomly
index_cards_weight = [0.5,2,1,1,1,0.5,1,0.5,1,1,0.75,1,1,0]



//print (str(len(index_cards)))
//print (str(len(index_cards_costs)))

//print(str(index_cards [8]))
//print(str(index_cards_costs [8]))
//print(str(index_cards_dmg [8]))

index_cards_offensive = ["fireball","slash","cut","stab","magic missile","throw stone","cleave","ignite","punch","sicken","spit ooze"]
//index_cards_defensive = []

index_cards = ["fireball","slash","cut","stab","magic missile","heal","throw stone","cleave","ignite","punch","thorn shield","limber","sicken","spit ooze","consume","exhaust"]
index_cards_costs = [3,1,1,1,2,3,1,3,2,1,2,2,1,2,2,1]
index_cards_dmg   = [5,3,2,3,2,0,2,7,0,2,0,0,0,4,0,0]
//Really dumb way to do this. Could store in one list, then use multiplication to search for second and third effects
index_cards_effects = ["fire","","","bleed","accurate","heal","ranged","miss","fire","","thorns","evasion","poison","poison","grow","temporary"]
index_cards_effects_potencies = [1,0,0,1,1,5,1,30,1,0,3,30,3,1,1,1]

index_cards_effects2 = ["","","","","ranged","","","","burn","","","","","harm","heal",""]
index_cards_effects_potencies2 = [0,0,0,0,1,0,0,0,3,0,0,0,0,3,3,0]

index_cards_effects3 = ["","","","","","","","","","","","","","shrink","",""]
index_cards_effects_potencies3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0]

index_effects_offensive = ["burn","bleed","poison"]
index_effects_defensive = ["thorns","heal","evasion","consume"]

index_cards_effects += index_cards_effects2
index_cards_effects += index_cards_effects3

index_cards_effects_potencies += index_cards_effects_potencies2
index_cards_effects_potencies += index_cards_effects_potencies3

index_cards_info = [
"shoots a fireball",
"slashes the target",
"cuts the target",
"applies Bleed 1\nstabs the target, causing light bleeding",
"accurate\nRanged\nfires a homing missile that causes minor damage",
"Heal 5\nheals you for some health",
"Ranged\nthrows a stone at the target",
"30% chance to miss\nwildly slashes at the target, dealing heavy damage if it connects",
"applies Burn 3\nignites the target, causing severe burns",
"punches the target",
"grants Thorns 3\ngrows a shield of thorns around you",
"grants Evasion 20\nWarms up your muscles",
"Poison 3\nPoisons the target",
"Harm 3\nPoison 1\nRanged\nSplits off a part of your body and shoots it at the target, dealing high damage and causing poison, but also causes you to take some damage.",
"Grow 1\nHeal 3\nConsume the grass underneath you. Gives health and causes you to grow",
"Temporary\nRest for a moment. Junk card."]

"""
Effects:
    

    Bleed n:
        At end of turn: take n dmg, -1 stack. Bleed doesn't stack, but each application of bleed is applied seperately (instead of bleed 5, you have bleed 2 and bleed 3, dealing 5 dmg at end of turn, but resulting in bleed 1 and bleed 2)

    Burn n:
        The next Fire attack deals +n dmg
        
    Cure X:
        Dispel but rebranded (For poison flavour)
        
    Dispel X:
        Removes all applications of X on target (X is an effect name or "All")
        
    Evasion n:
        Whenever you would be attacked by an attack that doesn't have accurate or undodgeable, you have a n% chance to dodge it, cancelling all of its effects. Lose half of your Evasion on a successful dodge.

    Fire: 
        Nothing on its own. Synergizes with other effects.
    
    Heal n:
        Heal n health
    
    Miss n:
        Attack has a n% chance to miss and do nothing.
        //Check this first
    
    Poison n:
        Deals n dmg, then lose half (rounded up) stacks
    
    Ranged:
        Doesn't proc retaliation effects
    
    Thorns n:
        Returns half the damage (rounded up) of the next n attacks, max n dmg per attack (-1 stack per attack)
    
    Undodgeable:
        Can't be dodged
    
    Accurate:
        Can't miss or be dodged
        //Check before Miss.
        //Add a card that applies Accurate to any card
"""

index_effects = ["bleed","burn","cure","dispel","evasion","fire","heal","miss","poison","ranged","thorns","undodgeable","accurate","harm","grow","shrink","temporary"]
index_effects_with_n = ["Bleed n","Burn n","Cure","Dispel X","Evasion n","Fire","Heal n","Miss n","Poison n","Ranged","Thorns n","Undodgeable","Accurate","Harm n","Grow n","Shrink n","Temporary"]
index_effects_info = [
"At end of turn, take n damage and remove one stack. Each application is tracked seperately.",
"The next Fire attack will deal n more damage",
"Removes all stacks of poison",
"Removes all stacks of X",
"Gives an n% chance to dodge attacks",
"Does nothing on its own, but synergizes with other effects",
"Heals you for n health",
"Has an n% chance to miss",
"Take n damage, then remove half of your poison stacks",
"Doesn't proc most retaliation effects",
"When you take damage, deal the lesser of half of that damage (rounded up) and n, then lose one stack",
"This card cannot be dodged",
"This card cannot miss or be dodged",
"Caster takes n damage. Does not proc 'When damaged' effects",
"Your attacks do n extra damage",
"Your attacks do n less damage",
"This card is destroyed when it is cast, rather than discarded"]
//Might be completely useless, but I'm leaving it in just in case
index_lookup_cardnum = 0

//Arrays start at 0

//this is a function that stores template vars
player_currentdeck = [1,2,3]
player_transitiondeck = [1,2,3]
player_deck = [0,1,2,3,4,5,6,7,8,9,10,11,12]
//Contains the number of each card in hand
player_handnum = []
player_hand = []
player_mana = 0
player_currentmana = 0
player_health = 100
player_maxhealth = 100
player_statuses = []
player_statuses_potencies = []
player_discard = []
player_exhaustion = 0


enemy_name = "slime"
enemy_health = 100
enemy_maxhealth = 100
enemy_statuses = []
enemy_statuses_potencies = []
enemy_currentdeck = []
enemy_deck = []
enemy_transitiondeck = []
enemy_hand = []
enemy_discard = []
enemy_exhaustion = 0
enemy_template_names = ["slime","bat"]
enemy_templatedecks = ["spit ooze","consume","heal","sicken","end","","end"]
enemy_templatedecks_nums = [13,14,5,11,12,"end","","end"]
//print(index_cards [15])
enemy_templatedecks_quantities = [9,5,2,3,"end",0,"end"]
enemy_template_maxhealths = [100,50]








function draw (amount):
    i = 1
    while i <= amount and len(player_deck) > 0:
        //The length of the deck is actually 8, but since the arrays start at 0, the maximum value of the list will always be undefined 
        if len(player_currentdeck) > 0:
            card = random.randint(0,len(player_currentdeck)-1)
            player_handnum.append (player_currentdeck [card])
            player_hand.append (index_cards[player_currentdeck[card]])
            player_currentdeck.pop(card)
            i += 1
        else:
            print("could not draw a card because your deck is empty! Use the 'shuffle' command to shuffle your discard pile into your deck.")
            i += amount + 1

//{{list name}}.append ({{value}})
//player_deck.append (9)

//Remember that card is a local var and needs to be inputted into the functions manually
function lookup(card):
    i = 0
    index_lookup_cardnum = card
    if card == "discard":
        print ("Your discard pile:")
        print (player_discard)
        print ("The " + enemy_name +"'s discard pile:")
        print (enemy_discard)
    if card in index_cards:
        i = index_cards.index(card)
        print ("\n" + str(index_cards[i]) + "  cost: " + str(index_cards_costs[i]) + "  dmg: " + str(index_cards_dmg [i]) + "\n" + index_cards_info[i] + "\n")
    elif card in index_effects:
        i = index_effects.index(card)
        print ("\n" + str(index_effects_with_n[i]) + "\n" + index_effects_info[i] + "\n")
        
//Prompts for card to cast
function prompt_attack():
    if len(player_currentdeck) + len(player_hand) == 0:
        print ("You ran out of cards!")
        newdeck("player")
    else:
        print (player_hand)
        card = input ("type the number of a card to cast, its name to display card info, or 'end turn' to end your turn")
    
        if card == "shuffle":
            newdeck("player")
        elif card == "end turn" or card == "end" or card == "pass" or card =="pass turn":
           print ("You wait")
        elif card.isnumeric() == False:
            if card in index_cards or card in index_effects or card == "discard":
                lookup (card)
                prompt_attack()
            else:
                print ("invalid card")
                prompt_attack()
        elif int(card) >0 and int(card) <= len(player_hand):
           cast(card,"player")
        else:
            print ("invalid card")
            prompt_attack()

function cast (card,caster):
    global enemy_maxhealth
    global enemy_health
    global player_health
    global player_maxhealth
    global enemy_statuses
    global enemy_statuses_potencies
    global player_statuses
    global player_statuses_potencies
    global player_handnum
    global player_hand
    global enemy_hand
    global enemy_handnum
    global enemy_discard
    global player_discard
    global index_cards_effects
    global index_cards_effects_potencies
    
    function clean_statuses (List):
    
        i = 0
        if List == "caster":
            while i < len(caster_statuses):
                if caster_statuses_potencies [i] < 1:
                    caster_statuses.pop (i)
                    caster_statuses_potencies.pop (i)
                i += 1
        elif List == "target":
            while i < len(target_statuses):
                if target_statuses_potencies [i] < 1:
                    target_statuses.pop (i)
                    target_statuses_potencies.pop (i)
                i += 1



    if caster == "player":
        target_health = enemy_health
        target_maxhealth = enemy_maxhealth
        target_statuses = enemy_statuses
        target_statuses_potencies = enemy_statuses_potencies
        target_discard = enemy_discard
        
        caster_health = player_health
        caster_maxhealth = player_maxhealth
        caster_statuses = player_statuses
        caster_statuses_potencies = player_statuses_potencies
        caster_hand = player_hand
        caster_handnum = player_handnum 
        caster_discard = player_discard
        caster_name = "You"
        caster_conjugation = ""
        caster_conjugation_s = ""
        caster_article_possessive = "your"
        target_name = "the " + enemy_name
        target_conjugation = "s"
        caster_name_possessive = "your"
    elif caster == "enemy":
        target_health = player_health
        target_maxhealth = player_maxhealth
        target_statuses = player_statuses
        target_statuses_potencies = player_statuses_potencies
        target_discard = player_discard
        
        caster_health = enemy_health
        caster_maxhealth = enemy_maxhealth
        caster_statuses = enemy_statuses
        caster_statuses_potencies = enemy_statuses_potencies
        caster_hand = enemy_hand
        caster_discard = enemy_discard
        caster_name = "The " + enemy_name
        caster_conjugation_s = "es"
        caster_conjugation = "s"
        caster_article_possessive = "its"
        target_name = "you"
        target_conjugation = ""
        caster_name_possessive = caster_name + "'s"
        //Handnum is redundant. Hand is already numbers. Only used to maintain symmetry between player and enemy functions.
        caster_handnum = enemy_hand
    else:
        print("Error in cast function [1/2]")




    castcard = caster_handnum[int(card)-1]
    print (caster_name + " cast" + caster_conjugation + " " + index_cards[castcard] + "!")
    

    
    //effects
    castcard_effects = []
    castcard_effects_potencies = []
    i = 1
    while len (index_cards_effects) >= i*len(index_cards) and not index_cards_effects [castcard+(i-1)*len(index_cards)] == "":
        castcard_effects.append (index_cards_effects [castcard+(i-1)*len(index_cards)])
        castcard_effects_potencies.append (index_cards_effects_potencies [castcard+(i-1)*len(index_cards)])
        i+=1
    //Remove when finished, or maybe don't
    if len(castcard_effects) > 0:
        print(castcard_effects) 
        print (castcard_effects_potencies)
    i = 0
    miss = 0
    dodged = 0
    foo = 0
    
    //Even if they miss, the harm is still done
    if "harm" in castcard_effects:
        caster_health -= castcard_effects_potencies [castcard_effects.index("harm")]
    
    if not "accurate" in castcard_effects:
        if "miss" in castcard_effects:
            while not foo == 1:
                //idk why, but using miss as the var for the while loop doesn't work
                if castcard_effects [i] == "miss":
                    n = random.randint (1,100)
                    if n <= castcard_effects_potencies [i]:
                        miss = True
                        foo = 1
                    else:
                        miss = False
                        foo = 1
                else:
                    i += 1
        if "evasion" in target_statuses and not "undodgeable" in castcard_effects and index_cards [castcard] in index_cards_offensive and not miss == True:
            chance = target_statuses_potencies[target_statuses.index("evasion")]
            n = random.randint (1,100)
            if n <= chance:
                dodged = True
                target_statuses_potencies [target_statuses.index("evasion")] -= math.ceil(target_statuses_potencies [target_statuses.index("evasion")]/2)
            else:
                dodged = False
        
        if miss == True or dodged == True:
            if miss == True:
                print (caster_name + " miss" + caster_conjugation_s + " " + caster_article_possessive + " attack!")
            elif dodged == True:
                print (target_name + " dodge" + target_conjugation + " " + caster_name_possessive + " attack!")

        //Applies the casted card's effects
        else:
            //Not using the <= makes the fact that i starts at 0 work out. 
            //(when i = 1 and the length of castcard_effects is 2, i is using the 2nd card in the list)
            while i < len(castcard_effects):
                if "fire" == castcard_effects [i]:
                 if "burn" in target_statuses:
                        print (index_cards[castcard] + " burns " + target_name + " for " + str(target_statuses_potencies [target_statuses.index("burn")]) + " damage!")
                        target_health -= target_statuses_potencies [target_statuses.index("burn")]
                        //Don't put the status above the potencies. Otherwise the burn will get popped out before the potencies can use it
                        target_statuses_potencies.pop (target_statuses.index("burn"))
                        target_statuses.pop (target_statuses.index("burn"))
                elif "heal" == castcard_effects [i]:
                    caster_health += castcard_effects_potencies [i]
                elif "cure" == castcard_effects [i] or "dispel" == castcard_effects [i]:
                    if castcard_effects_potencies [i] in caster_statuses:
                        caster_statuses.pop (castcard_effects [i])
                        caster_statuses_potencies.pop (castcard_effects_potencies [i])
                elif "bleed" == castcard_effects [i]:
                    target_statuses.append("bleed")
                    target_statuses_potencies.append(castcard_effects_potencies [i])
                    
                elif castcard_effects [i] in index_effects_defensive:
                    if not castcard_effects [i] in caster_statuses:
                        caster_statuses.append(castcard_effects [i])
                        caster_statuses_potencies.append(castcard_effects_potencies [i])
                    else:
                        caster_statuses_potencies [caster_statuses.index (castcard_effects [i])] += castcard_effects_potencies [i]
       
                elif castcard_effects [i] in index_effects_offensive:
                    if not castcard_effects [i] == "bleed":
                        if not castcard_effects [i] in target_statuses:
                            target_statuses.append(castcard_effects [i])
                            target_statuses_potencies.append(castcard_effects_potencies [i])
                        else:
                            target_statuses_potencies [target_statuses.index (castcard_effects [i])] += castcard_effects_potencies [i]
                i+=1
            if "grow" in caster_statuses:
                target_health -= caster_statuses_potencies [caster_statuses.index ("grow")]
            target_health -= index_cards_dmg [castcard]
            if card in index_cards_offensive:
                print (caster_name + " hit" + caster_conjugation + " " + target_name)
            
        //Applies the effects of the caster's statuses
    
    i = 0
    while i < len(caster_statuses):
        if "poison" == caster_statuses [i]:
            print (caster_name + " take" + caster_conjugation + " " + str(caster_statuses_potencies [i]) + " poison damage")
            caster_health -= caster_statuses_potencies [i]
            caster_statuses_potencies [i] -= math.ceil(caster_statuses_potencies [i]/2)
        elif "bleed" == caster_statuses [i]:
            caster_health -= caster_statuses_potencies [i]
            caster_statuses_potencies [i] -= 1
        
        i += 1
    
    
    if len(caster_statuses) > 0:
        clean_statuses ("caster")
        
    if caster_health > caster_maxhealth:
        caster_health = caster_maxhealth
        
    caster_discard.append (caster_handnum[int(card)-1])
    caster_hand.pop(int(card)-1)
    
    if caster == "player":
        enemy_health = target_health
        enemy_maxhealth = target_maxhealth
        enemy_statuses = target_statuses
        enemy_statuses_potencies = target_statuses_potencies
        
        player_health = caster_health
        player_maxhealth = caster_maxhealth
        player_statuses = caster_statuses
        player_statuses_potencies = caster_statuses_potencies
        player_hand = caster_hand
        player_handnum = caster_handnum
        caster_handnum.pop(int(card)-1)
    elif caster == "enemy":
        player_health = target_health
        player_maxhealth = target_maxhealth
        player_statuses = target_statuses
        player_statuses_potencies = target_statuses_potencies
        enemy_health = caster_health
        enemy_maxhealth = caster_maxhealth
        enemy_statuses = caster_statuses
        enemy_statuses_potencies = caster_statuses_potencies
        enemy_hand = caster_hand
        enemy_handnum = caster_handnum
    else:
        print("Error in cast function [2/2]")
    
    print (enemy_name + ": " + str(enemy_health) + " health")
    
    if len(enemy_statuses) > 0:
        print (enemy_statuses)
        print (enemy_statuses_potencies)
    
    print ("You: " + str(player_health) + " health")
    if len(player_statuses) > 0:
        print (player_statuses)
        print (player_statuses_potencies)

function initializedeck():
    global player_currentdeck
    global player_transitiondeck
    player_currentdeck = []
    player_transitiondeck = []
    while len(player_transitiondeck) < len(player_deck):
        player_transitiondeck.append(player_deck [len(player_transitiondeck)-1])
    while len(player_currentdeck) < len(player_deck):
        foo = random.randint(1,len(player_transitiondeck))-1
        player_currentdeck.append(player_transitiondeck[foo])
        player_transitiondeck.pop(foo)

function newdeck(caster):
    global player_discard
    global enemy_discard
    global player_currentdeck
    global enemy_currentdeck
    global player_hand
    global player_handnum
    global enemy_hand
    global enemy_handnum
    global player_exhaustion
    global enemy_exhaustion
    
    currentdeck = []

    if caster == "player":
        transitiondeck = player_discard
        hand = player_handnum
        exhaustion = player_exhaustion
        print ("You are redrawing")
    elif caster == "enemy":
        transitiondeck = enemy_discard
        hand = enemy_handnum
        exhaustion = enemy_exhaustion
        print ("Enemy is redrawing")
    
    while len(hand) > 0:
        transitiondeck.append (hand[0])
        hand.pop(0)

    foo = 0
    while foo < exhaustion:
        transitiondeck.append(15)
        foo += 1
    //Randomizes deck
    
    while len(transitiondeck) > 0:
        foo = random.randint(1,len(transitiondeck))-1
        currentdeck.append(transitiondeck[foo])
        transitiondeck.pop(foo)
    
    if caster == "player":
        player_currentdeck = currentdeck
        player_hand = []
        player_handnum = []
        player_exhaustion += 1
        draw (5)
    if caster == "enemy":
        enemy_currentdeck = currentdeck
        enemy_hand = []
        enemy_handnum = []
        enemy_exhaustion += 1
        enemy_draw (5)

function enemy_draw (amount):
    global enemy_hand
    global enemy_currentdeck
    i = 1
    while i <= amount and len(enemy_currentdeck) > 0:
        //The length of the deck is actually 8, but since the arrays start at 0, the maximum value of the list will always be undefined 
        if len(enemy_currentdeck) > 0:
            card = random.randint(0,len(enemy_currentdeck)-1)
            enemy_hand.append (enemy_currentdeck[card])
            enemy_currentdeck.pop(card)
            i += 1
        else:
            i += amount + 1

function enemy_initialize_deck ():
    global enemy_currentdeck
    global enemy_transitiondeck
    enemy_currentdeck = []
    enemy_transitiondeck = []
    i = 0
    foo = 0
    while i < enemynum-1:
        if enemy_templatedecks [foo] == "end":
            i +=1
        foo += 1
    
    //Takes cards from the template deck list
    i = 0
    while not enemy_templatedecks [i] == "end":
        foo = 0
        while foo < enemy_templatedecks_quantities [i]:
            enemy_transitiondeck.append (enemy_templatedecks_nums [i])
            foo += 1
        i += 1

    //Randomizes deck
    while len(enemy_transitiondeck) > 0:
        foo = random.randint(1,len(enemy_transitiondeck))-1
        enemy_currentdeck.append(int(enemy_transitiondeck[foo]))
        enemy_transitiondeck.pop(foo)

function enemy_attack():
    enemy_draw(1)
    if len(enemy_hand) > 1:
        cast(random.randint(0,len(enemy_hand)-1),"enemy")
    else:
        newdeck("enemy")

function create_enemy(enemy):
    global enemy_statuses
    global enemy_statuses_potencies
    global enemy_health
    global enemy_maxhealth
    global enemy_name
    global enemynum
    enemy_name = enemy_template_names [enemy-1]
    enemynum = enemy
    enemy_statuses = []
    enemy_statuses_potencies = []
    enemy_maxhealth = 100
    enemy_health = enemy_maxhealth

function startbattle():
    create_enemy(1)
    enemy_initialize_deck()
    enemy_draw (7)
    initializedeck()
    draw (7)

function battle():

    startbattle()
    //Detects whether you won or lost (tie = lose)
    while enemy_health > 0 and player_health > 0:
        draw(1)
        prompt_attack()
        enemy_attack()
    if player_health <= 0:
        print("You lose")
    else:
        print("You win!")





//Actual code goes here
battle()
