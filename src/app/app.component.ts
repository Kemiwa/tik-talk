import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from './common-ui/profile-card/profile-card.component';
import {ProfileService} from './data/services/profile.service';
import {Profile} from './data/interfaces/profile.interface';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, NgForOf],


  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []
  trackByProfileId: any;
  constructor() {
    this.profileService.getTestAccounts()
      .subscribe(val => {
        this.profiles = val
      })
  }
}
