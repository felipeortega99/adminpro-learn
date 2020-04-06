import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @Input() label: string = 'Label';
  @Input() progress: number = 50;

  @Output('changeValue') changeValueEmitter: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(newValue: number) {
    if ( newValue >= 100 ) {
      this.progress = 100;
    } else if ( newValue <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.txtProgress.nativeElement.value = this.progress;
    this.changeValueEmitter.emit( this.progress );
  }

  changeValue( value ) {
    this.progress = +(this.progress);
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
    } else if (this.progress <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = this.progress + value;
    }
    this.changeValueEmitter.emit( this.progress );
    this.txtProgress.nativeElement.focus();
  }

}
