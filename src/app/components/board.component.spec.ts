import { TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
    }).compileComponents();
  });

  it('should create the board', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the board with 9 squares', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const numSquares = compiled.querySelectorAll('div.square');
    expect(numSquares).toHaveSize(9);
  });
});
