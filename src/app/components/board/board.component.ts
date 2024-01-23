import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Entry, PlayerMark} from "../../app.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() entries: Entry[][] = [[null, null, null], [null, null, null], [null, null, null]];
  @Input() isEnabled!: boolean;
  @Input() currentPlayer!: PlayerMark;
  @Output() updateGamePlay: EventEmitter<Entry[][]> = new EventEmitter<Entry[][]>;

  markSquare = (row: number, col: number) => {
    if(this.isEnabled){
      this.entries[row][col] = this.currentPlayer;
      this.updateGamePlay.next(this.entries);
    }
  }

  clearBoard = () => {
    this.entries = [[null, null, null], [null, null, null], [null, null, null]];
  }
}
