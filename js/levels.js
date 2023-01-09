/// klasa, która zawiera dane wszytskich plansz gry
class Levels {
  constructor() {
    this.scorePoints = 0;
    this.robboLives = 3;
    this.gameSpeed = 200;
    this.levelCounter = 1;
    this.lastLevel = 3;

    // level 1

    this.level1 = [8, 11];
    this.level1part1 = [...`###########`];
    this.level1part2 = [...`#$        #`];
    this.level1part3 = [...`#R  A   B #`];
    this.level1part4 = [...`X#   ## # #`];
    this.level1part5 = [...`X   # S#  #`];
    this.level1part6 = [...`X#  Q     #`];
    this.level1part7 = [...`#E        #`];
    this.level1part8 = [...`###########`];

    // level 2

    this.level2 = [20, 22];
    this.level2part1 = [...`#############J###J####`];
    this.level2part2 = [...`#S    V    VV        O`];
    this.level2part3 = [...`#  Q   V S           O`];
    this.level2part4 = [...`M    W  VSV     Q    #`];
    this.level2part5 = [...`M  H             H   #`];
    this.level2part6 = [...`#   W            W  S#`];
    this.level2part7 = [...`#      ##FL##        #`];
    this.level2part8 = [...`#      #S##$#        #`];
    this.level2part9 = [...`#      #R   #        #`];
    this.level2part10 = [...`#VVVVV #  L #VVVVVVVV#`];
    this.level2part11 = [...`#       #  #         #`];
    this.level2part12 = [...`#                    #`];
    this.level2part13 = [...`#    Q    B    B     #`];
    this.level2part14 = [...`#   QAQ   B   B B    #`];
    this.level2part15 = [...`#  Q Q Q     B   B   #`];
    this.level2part16 = [...`#   JKQAQW  BVVVVVB  #`];
    this.level2part17 = [...`#            BBBBB   #`];
    this.level2part18 = [...`###                 V#`];
    this.level2part19 = [...`#SD                  #`];
    this.level2part20 = [...`####G###########GGGG##`];

    // level 3

    this.level3 = [15, 20];
    this.level3part1 = [...`####################`];
    this.level3part2 = [...`#  S    HHHHHH     #`];
    this.level3part3 = [...`#  Q               #`];
    this.level3part4 = [...`#    W   ###       #`];
    this.level3part5 = [...`#        # #       #`];
    this.level3part6 = [...`#   W    $     W   #`];
    this.level3part7 = [...`#      ######      #`];
    this.level3part8 = [...`#      #S##S#      #`];
    this.level3part9 = [...`#      # KK #      #`];
    this.level3part10 = [...`#      #    #      #`];
    this.level3part11 = [...`#       #  #       #`];
    this.level3part12 = [...`<       H          #`];
    this.level3part13 = [...`#    QS            #`];
    this.level3part14 = [...`# R QAQ   PS       #`];
    this.level3part15 = [...`#G#############G####`];

    // level 4
    this.level4 = [14, 20];
    this.level4part1 = [...`###########         `];
    this.level4part2 = [...`#  S HHHH #         `];
    this.level4part3 = [...`#  Q      ##        `];
    this.level4part4 = [...`#    W     #        `];
    this.level4part5 = [...`#        # ##       `];
    this.level4part6 = [...`#   W    $  ##      `];
    this.level4part7 = [...`#  R         ##     `];
    this.level4part8 = [...`#      #S##S# ######`];
    this.level4part9 = [...`#      #    #   #  #`];
    this.level4part10 = [...`#      #    #  #V  #`];
    this.level4part11 = [...`#       #  #   #   #`];
    this.level4part12 = [...`#       H      # S #`];
    this.level4part13 = [...`#    QS            #`];
    this.level4part14 = [...`####################`];
  }
}
// # - border
// S - screw
// V - bird vertical, no shoot
// H - bird horizontal, no shoot
// R - robbo
// Q - hash
// W - slide hash
// A - ammo
// $ - ship
// L - live
// K - key
// B - bomb
// P - wall
// D - door
// G - gun - shot up - laser
// J - gun - shot down - laser
// O - gun - shot left - laser
// M - gun - shot right - laser
// E - gun - shot right - single
// < - magnet right
// > - magnet left
// C - ant - left - up
// F - beetle - right - down
// X - black hole
