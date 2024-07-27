import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('menuAnimation', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('open => closed', [
        animate('0.3s ease-out')
      ]),
      transition('closed => open', [
        animate('0.3s ease-in')
      ]),
    ]),
  ]
})
export class MenuComponent {
  menuState: string = 'closed';

  toggleMenu() {
    this.menuState = this.menuState === 'open' ? 'closed' : 'open';
  }
}

