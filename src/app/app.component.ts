import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatToolbar } from '@angular/material/toolbar'
import { MatButton } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BehaviorSubject } from "rxjs";
import { BoardComponent } from "./components/board/board.component";
import { isWinningMove } from "../utils/gameUtils";

export enum PlayerMark {
  X = 'X',
  O = 'O'
}
export type Entry = PlayerMark|null;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatCard, MatCardContent, MatToolbar, MatButton, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  title = 'Tic-Tac-Toe';

  currentPlayer: PlayerMark = PlayerMark.X;

  winner: PlayerMark|undefined;

  isGameOver$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild(BoardComponent) board!: BoardComponent;

  ngOnInit() {
    this.isGameOver$.subscribe((isGameOver: boolean) => {
      if(isGameOver && this.winner){
        this.openSnackBar(`Congrats ${this.winner}, you are the winner!`, 'Reset');
      }else if(isGameOver && this.winner === undefined){
        this.openSnackBar(`It's a tie! Click Reset to start a new game.`, 'Reset');
      }
    });
  }

  updateGamePlay = (entries: Entry[][]) => {
    this.determineWinOrTie(entries);
    if(!this.isGameOver$.getValue()){
      this.currentPlayer = this.currentPlayer === PlayerMark.X ? PlayerMark.O : PlayerMark.X;
    }
  }

  determineWinOrTie = (entries: Entry[][]) => {
    if(isWinningMove(this.currentPlayer, entries)){
      this.winner = this.currentPlayer;
      this.isGameOver$.next(true);
    }else if(entries.reduce((a, arr) => a + arr.join(''), '').length === 9){
      this.isGameOver$.next(true);
    }
  }

  clearBoard = () => {
    this.board.clearBoard();
    this.winner = undefined;
    this.isGameOver$.next(false);
    this._snackBar.dismiss();
  }

  openSnackBar(message: string, action?: string) {
    const snackBarRef = this._snackBar.open(message, action, { horizontalPosition: "center", verticalPosition: "top" });
    snackBarRef.onAction().subscribe(this.clearBoard);
  }
}
