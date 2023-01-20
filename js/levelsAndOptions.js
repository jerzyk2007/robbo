/// klasa, która zawiera dane wszytskich plansz gry oraz podstawowych ustawień
class Levels {
  constructor() {
    this.scorePoints = 0;
    this.robboLives = 5;
    this.gameSpeed = 150;
    this.canMove = false;
    this.canMoveSetTime;
    this.activeMagnet = null;
    this.spaceShot = false;
    this.mobileMoveInterval;
    this.levelCounter = 1;
    this.lastLevel = 3;

    this.level1 = [
      [...`    A     $`],
      [...`           `],
      [...` @  j    l `],
      [...`      -  # `],
      [...`  ?     # #`],
      [...`          .`],
      [...`11111111111`],
      [...`           `],
      [...`           `],
      [...`     II    `],
      [...`           `],
      [...`  m     k  `],
      [...`           `],
    ];

    // level 1
    // this.level1 = [
    //   [...`1111111111111111`],
    //   [...`1   1   1I 1   1`],
    //   [...`1 @ 1 j 11 1 k 1`],
    //   [...`1 1 1    1 1   1`],
    //   [...`1 # 11 #   1 1 1`],
    //   [...`1    1 11111 1 1`],
    //   [...`1A   1  1  J 1 1`],
    //   [...`1111 1I#1  J 1 1`],
    //   [...`1B   11 1  J 1 1`],
    //   [...`1    1  1 1111 1`],
    //   [...`1    1I 1   1Y 1`],
    //   [...`1  11111111 1  1`],
    //   [...`1    1    D 1  1`],
    //   [...`1 B  1 #  111  1`],
    //   [...`1    11 111A   1`],
    //   [...`1    1    111 11`],
    //   [...`1# B#1   # 1# #1`],
    //   [...`1# ##  ##  1   1`],
    //   [...`1###    ##11   1`],
    //   [...`1F# ## #I 1    1`],
    //   [...`11111111111#11 1`],
    //   [...`1   1     1 F1D1`],
    //   [...`V     I   1 11 1`],
    //   [...`1   1   #      1`],
    //   [...`1 ? 1#11111 1 11`],
    //   [...`1     1I   #   1`],
    //   [...`11111 11111 1 11`],
    //   [...`1   1 1   1 1111`],
    //   [...`1 $     I 1    1`],
    //   [...`1   1 1   1   I1`],
    //   [...`1111111111111111`],
    // ];

    // this.level1 = [
    //   [...`          $`],
    //   [...`           `],
    //   [...` @  j    l `],
    //   [...`      -  # `],
    //   [...`        # #`],
    //   [...`          .`],
    //   [...`11111111111`],
    //   [...`           `],
    //   [...`           `],
    //   [...`           `],
    //   [...`           `],
    //   [...`  m     k  `],
    //   [...`           `],
    // ];

    // this.level1 = [
    //   [...`3333333333333333`],
    //   [...`3              3`],
    //   [...`3 3Q        3Y 3`],
    //   [...`3   F3I3 I     3`],
    //   [...`3V        3    3`],
    //   [...`3BBBBBB BBBJ3  P`],
    //   [...`3B  33 33  B  I3`],
    //   [...`3BM  3 3   B3  3`],
    //   [...`3B33  @   JB   3`],
    //   [...`3BF3 3 3 3 B  33`],
    //   [...`3B FD    33#   3`],
    //   [...`3B   3 3  PB3DD3`],
    //   [...`3B  33 33 gb   3`],
    //   [...`3 BBBBB BBBB   3`],
    //   [...`333 i33   3  3 3`],
    //   [...`d    3  3 3    3`],
    //   [...`33 i 3N        3`],
    //   [...`33   3M       I3`],
    //   [...`33   3M       I3`],
    //   [...`3$333BBBBBBBBBB3`],
    //   [...`3   IB I33 33 B3`],
    //   [...`3    B   P 3  B3`],
    //   [...`3 3  B3A      B3`],
    //   [...`3    B33 h#3 333`],
    //   [...`3   IB        P3`],
    //   [...`3   IB   3 3I B3`],
    //   [...`3    B3 33 33 B3`],
    //   [...`3K   BBBBBBBBBB3`],
    //   [...`3      3  I 3  3`],
    //   [...`3           D  3`],
    //   [...`33K   K  K  3  3`],
    //   [...`3333333333333333`],
    // ];

    // level 2
    this.level2 = [
      [...`1111111111111111`],
      [...`1K L KKKLLKLKLK1`],
      [...`1JJJJJJJJJJJJJJ1`],
      [...`1%  % %   %   I1`],
      [...`1  %   %    J  1`],
      [...`1%% %%   %%    1`],
      [...`1  %% %b%  %   1`],
      [...`1I%   %   %  1 1`],
      [...`1  %%%   %  #  1`],
      [...`11X B X1X1X1@ M1`],
      [...`1111B1111111J111`],
      [...`1A  BB1LJI %%  1`],
      [...`1    B1KJ  % % W`],
      [...`1  J B1LJ %    W`],
      [...`1  1 B2LJ  % B 1`],
      [...`1    B1 J % 1  1`],
      [...`1 N  B1KJ  %   W`],
      [...`1 1  B1LJ%%  I 1`],
      [...`1M   B1KJ  #%  W`],
      [...`1I   BBLJ    % 1`],
      [...`111D11B1111%1111`],
      [...`1   1BBBKJ%   I1`],
      [...`1 G 1BL1LJ B%  W`],
      [...`1   1BK1KJ   % W`],
      [...`1   BJL1LJ %   W`],
      [...`1  1BJK1KJ  #% 1`],
      [...`1  1BJL1 J %   W`],
      [...`1  1BJK1LJ % %%1`],
      [...`1   BJK1LJ % %%1`],
      [...`1$  BJI1KJ     1`],
      [...`1111111111111111`],
    ];

    // level 3

    this.level3 = [
      [...`2222222222222222`],
      [...`2Y2 2Y2 2Y2 2 O2`],
      [...`2 2 2 2 2 2 2  2`],
      [...`2 2 I 2 I 2 2  2`],
      [...`2 2 2 2 2 2 2  2`],
      [...`2I2 2 2 2 2 2 #2`],
      [...`2 2 2 2 2 2 I  P`],
      [...`2 2 2 2 2 2 2  2`],
      [...`2 2 2 2 2 2 2 #2`],
      [...`2 2 2 2 2 2 2  2`],
      [...`2 2 2 2 2 2 2  P`],
      [...`2 I 2 I 2 I 2 #2`],
      [...`2 2 2 2 2 2 2 @2`],
      [...`2 2X2 2X2 2X2  2`],
      [...`2222222222222  2`],
      [...`2$22I22 22M22  2`],
      [...`2M22M22 22 22  2`],
      [...`2 22 22I22 22  2`],
      [...`2 22 22M22 22  2`],
      [...`2 22    22 22  2`],
      [...`2 22 22 22 22  2`],
      [...`2 22 22    22  2`],
      [...`2 22 22 22 22  2`],
      [...`2 22 22 22     2`],
      [...`2 22 22 22 22  2`],
      [...`2    22 22I22  2`],
      [...`2 22 22 22 22  2`],
      [...`2I22 22 22 22  2`],
      [...`2 22 22 22 22  2`],
      [...`2 22 22 22 22  2`],
      [...`2222 22222222222`],
    ];
  }
}

// @ - robbo-
// $ - ship-
// # - hash simple-
// % - hash mobile-
// ? - ?                         *
// 1 - first border-
// 2- second border-
// 3 - third border-
// 4 - fourth border-
// A - ammo-
// B - bomb-
// C - black hole – empty space-
// D - door-
// E - eyes                      *
// F - key-
// G - live-
// H - bench-                     *
// I - screw - suggest max 99-
// J - wall-
// K - ant - left-
// L - beetle - right-
// M - bird vertical, no shot-
// N - bird horiontal, no shot-
// O - bird horiontal, single shot-
// P - magnet left-
// Q - magnet right-
// R - gun - shot right – single-
// S - gun - shot left – single-
// T - gun - shot up – single-
// U - gun - shot down – single-
// V - gun - shot right – laser-
// W - gun - shot left – laser-
// X - gun - shot up – laser-
// Y - gun - shot down – laser-
// Z - gun - shot right – single, moving up-down-
// a - gun - shot left – single, moving up-down-
// b - gun - shot up – single, moving up-down-
// c - gun - shot down – single, moving up-down-
// d - gun - shot right – burner-
// e - gun - shot left – burner-
// f - gun - shot up – burner-
// g - gun - shot down – burner-
// h - gun - shot down – rotate, single shot-
// teleport - use as a pair or just one - max 10 pair
//
// j - teleport A0 - 0A
// k - teleport 0A - A0
// l - teleport A1 - 1A
// m - teleport 1A - A1
// n - teleport A2 - 2A
// o - teleport 2A - A2
// p - teleport A3 - 3A
// q - teleport 3A - A3
// r - teleport A4 - 4A
// s - teleport 4A - A4
// t - teleport A5 - 5A
// u - teleport 5A - A5
// v - teleport A6 - 6A
// w - teleport 6A - A6
// x - teleport A7 - 7A
// y - teleport 7A - A7
// z - teleport A8 - 8A
// , - teleport 8A - A8
// . - teleport A9 - 9A
// - - teleport 9A - A9
