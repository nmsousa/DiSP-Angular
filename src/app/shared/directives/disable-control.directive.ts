import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]'
})
export class DisableControlDirective implements OnChanges {

  @Input('appDisableControl') condition: boolean;

  constructor(private ngControl: NgControl) { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'condition') {
          if (this.ngControl) {
            const action = this.condition ? 'disable' : 'enable';
            // If condition = true, disables the component
            this.ngControl.control[action]();
            // It's probably a checkbox and if so, we clear the value
            if (this.ngControl.control.value === true) {
              this.ngControl.control.setValue(false);
            }
          }
        }
      }
    }
  }

}
