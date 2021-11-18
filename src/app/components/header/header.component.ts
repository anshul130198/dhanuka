import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  animations: [
		trigger('onOff', [
			transition('void => *', [style({
				opacity: 0,
				transform: 'translateX(-10%)'
			}),
			animate(400)
			]),
      transition(':leave', [style({
				opacity: 0,
				transform: 'translateX(10%)'
			}),
			animate(400)
			])
		])
	]
})


export class HeaderComponent {
  showNav=false;

  toggleNav(){
    this.showNav=!this.showNav;
  }
}
