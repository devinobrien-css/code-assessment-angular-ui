import { Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {}

  tl = gsap.timeline();

  ngAfterViewInit() {
    this.tl.from('#root', { ease: 'linear', autoAlpha: 0, duration: 0.3 });
  }
}
