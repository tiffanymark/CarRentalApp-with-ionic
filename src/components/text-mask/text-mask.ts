import { Directive, ElementRef, forwardRef, Input, NgModule, Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';

@Directive({
  host: {
    '(input)': 'onInput($event.target.value)',
    '(blur)': '_onTouched()'
  },
  selector: '[text-mask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextMask),
    multi: true
  }]
})
export class TextMask implements ControlValueAccessor {

  private textMaskInputElement: any;
  private inputElement:HTMLInputElement;

  private lastValue: any;

  @Input('textMask')
  textMaskConfig = {
    mask: '',
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
  }

  _onTouched = () => {}
  _onChange = (_: any) => {}


  constructor(private renderer: Renderer, private element: ElementRef) {
    
  }

  private setupMask() {
    if (this.element.nativeElement.tagName === 'INPUT') {
      this.inputElement = this.element.nativeElement;
    } else {
      this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0];
    }

    if (this.inputElement) {
      this.textMaskInputElement = createTextMaskInputElement(
          Object.assign({inputElement: this.inputElement}, this.textMaskConfig)
      );
    }
  }

  writeValue(value: any) {
    if (!this.inputElement) {
      this.setupMask();
    }

    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value);
    }
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }

  registerOnTouched(fn: () => any): void { this._onTouched = fn }

  onInput(value) {
    if (!this.inputElement) {
      this.setupMask();
    }

    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value);
      
      value = this.inputElement.value;

      if (this.lastValue !== value) {
        this.lastValue = value;
        this._onChange(value);
      }
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled);
  }
}

@NgModule({
  declarations: [TextMask],
  exports: [TextMask],
  imports: [CommonModule]
})
export class TextMaskModule {}
export { conformToMask } from 'text-mask-core/dist/textMaskCore';


