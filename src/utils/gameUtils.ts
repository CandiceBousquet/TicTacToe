import {Entry, PlayerMark} from "../app/app.component";

export const isWinningMove = (player: PlayerMark, board: Entry[][]): boolean => {
  let threeInARow = false;
  for(let i = 0; i < 3; i++){
    if(board[i].filter((item: Entry) => item === player).length === 3){
      threeInARow = true;
    }
    if([board[0][i], board[1][i], board[2][i]].filter((item: Entry) => item === player).length === 3){
      threeInARow = true;
    }
  }
  if([board[0][0], board[1][1], board[2][2]].filter((item: Entry) => item === player).length === 3){
    threeInARow = true;
  }
  if([board[0][2], board[1][1], board[2][0]].filter((item: Entry) => item === player).length === 3){
    threeInARow = true;
  }
  return threeInARow;
}
