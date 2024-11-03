import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from './common-ui/profile-card/profile-card.component';
import {JsonPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, NgForOf, JsonPipe],


  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
