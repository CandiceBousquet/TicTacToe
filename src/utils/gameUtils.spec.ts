import {isWinningMove} from "./gameUtils";
import {Entry, PlayerMark} from "../app/components/app.component";

describe('isWinningMove', () => {
  let entries: Entry[][];
  beforeEach(() => {
    entries = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  })
  for(let i=0;i<3;i++){
    it(`should return true when 3 in a row (${i})`, () => {
      const winningRow = [PlayerMark.X, PlayerMark.X, PlayerMark.X];
      entries[i] = winningRow;
      const result = isWinningMove(PlayerMark.X, entries);
      expect(result).toBeTruthy();
    });
  }
  for(let i=0;i<3;i++){
    it(`should return true when 3 in a column (${i})`, () => {
      entries[0][i] = PlayerMark.X;
      entries[1][i] = PlayerMark.X;
      entries[2][i] = PlayerMark.X;
      const result = isWinningMove(PlayerMark.X, entries);
      expect(result).toBeTruthy();
    });
  }

  it(`should return true when 3 in a diagonal (top-left to bottom-right)`, () => {
    entries[0][0] = PlayerMark.O;
    entries[1][1] = PlayerMark.O;
    entries[2][2] = PlayerMark.O;
    const result = isWinningMove(PlayerMark.O, entries);
    expect(result).toBeTruthy();
  });

  it(`should return true when 3 in a diagonal (bottom-left to top-right)`, () => {
    entries[2][0] = PlayerMark.O;
    entries[1][1] = PlayerMark.O;
    entries[0][2] = PlayerMark.O;
    const result = isWinningMove(PlayerMark.O, entries);
    expect(result).toBeTruthy();
  });

  it(`should return false when 3 continuous letters are not found`, () => {
    const resultWhenEmptyPlayerO = isWinningMove(PlayerMark.O, entries);
    const resultWhenEmptyPlayerX = isWinningMove(PlayerMark.X, entries);
    expect(resultWhenEmptyPlayerO).toBeFalsy();
    expect(resultWhenEmptyPlayerX).toBeFalsy();

    entries = [
      [PlayerMark.X, PlayerMark.O, PlayerMark.X],
      [PlayerMark.X, PlayerMark.O, PlayerMark.O],
      [PlayerMark.O, PlayerMark.X, PlayerMark.O],
    ];

    const resultWhenFilledPlayerO = isWinningMove(PlayerMark.O, entries);
    const resultWhenFilledPlayerX = isWinningMove(PlayerMark.X, entries);
    expect(resultWhenFilledPlayerO).toBeFalsy();
    expect(resultWhenFilledPlayerX).toBeFalsy();
  });
});
