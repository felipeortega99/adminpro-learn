import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settingsService: SettingsService) { }

  ngOnInit(): void {
    this.placeCheck();
  }

  changeColor(theme: string, link: any) {
    this.applyCheck(link);
    this.settingsService.applyTheme( theme );
  }

  applyCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  placeCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this.settingsService.settings.theme;

    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
