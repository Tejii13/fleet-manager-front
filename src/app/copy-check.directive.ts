import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';

  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.tooltipElement) {
      this.tooltipElement = this.createTooltipElement();
      this.renderer.appendChild(document.body, this.tooltipElement);
    }

    this.positionTooltip(event);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private createTooltipElement(): HTMLElement {
    const tooltip = this.renderer.createElement('div');
    this.renderer.addClass(tooltip, 'tooltip');
    this.renderer.appendChild(
      tooltip,
      this.renderer.createText(this.tooltipText)
    );
    return tooltip;
  }

  private positionTooltip(event: MouseEvent) {
    if (this.tooltipElement) {
      const { clientX, clientY } = event;
      const offsetX = 20; // Adjust this value to control the distance from the cursor
      const offsetY = 10; // Adjust this value to control the distance from the cursor
      this.renderer.setStyle(
        this.tooltipElement,
        'left',
        `${clientX + offsetX}px`
      );
      this.renderer.setStyle(
        this.tooltipElement,
        'top',
        `${clientY + offsetY}px`
      );
    }
  }
}
