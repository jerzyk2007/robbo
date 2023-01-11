/// klasa, która zawiera dane wszytskich plansz gry oraz podstawowych ustawień
class Levels {
  constructor() {
    this.scorePoints = 0;
    this.robboLives = 3;
    this.gameSpeed = 200;
    this.levelCounter = 1;
    this.lastLevel = 1;
    this.canMove = true;
    this.canMoveSetTime;
    this.activeMagnet = null;

    // level 1

    this.level1 = [8, 11];
    this.level1part1 = [...`           `];
    this.level1part2 = [...`&#    M    `];
    this.level1part3 = [...` @ A#     *`];
    this.level1part4 = [...`A# k       `];
    this.level1part5 = [...`         # `];
    this.level1part6 = [...`<         >`];
    this.level1part7 = [...`           `];
    this.level1part8 = [...`CCCCCCCCCCC`];

    // level 2
  }
}
// A – ammo
// B – bomb
// C - wall
// D – door
// E - gun - shot right – single
// e - gun - shot right – laser
// F - gun - shot left – single
// f - gun - shot left – laser
// G - gun – shot up – single
// g - gun - shot up – laser
// H - gun - shot down – single
// h - gun - shot down – laser
// I – gun - shot right - burner *
// i - gun - shot right – single, moving up-down
// J - gun - shot left - burner *
// j - gun - shot left – single, moving up-down
// K – gun - shot up - burner *
// k - gun - shot up – single, moving left-right
// L – gun - shot down - burner *
// l - gun - shot down – single, moving left-right
// M - gun - shot down – rotate, single shot
// N - ant - left
// O - beetle - right
// P – bird vertical, no shot
// Q - bird horiontal, no shot
// q - bird horiontal, single shot
// R –
// S –
// T -
// U –
// V -
// W -
// X – black hole – empty space
// Y –
// Z –
// ! – live
//@ - robbo
// # - hash
// $ - sliding hash
// % - screw
// ^ - key
// & - ship
// * - border
// ( -
// ) –
// - -
// _ -
// + -
// = -
// < - magnet right
// > - magnet left
