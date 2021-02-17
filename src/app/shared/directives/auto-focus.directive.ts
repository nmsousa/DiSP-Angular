import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit {

  @Input('appAutoFocus') isFocused: boolean;

  constructor(private hostElement: ElementRef) {
  }

  ngOnInit() {
    this.focusElement();
  }

  focusElement(): void {
    if (this.isFocused) {
      this.hostElement.nativeElement.focus();
    }
  }

}
