import { effect, inject, Injectable, signal } from '@angular/core';
import { producerUpdatesAllowed } from '@angular/core/primitives/signals';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LangService
{
  translate: TranslateService = inject(TranslateService);
  currentLang = signal('en');

  constructor()
  {
    effect(() =>
    {
      console.log(this.currentLang());
      if (localStorage != undefined)
      {
        this.translate.use(this.currentLang().toLowerCase());
        localStorage.setItem('lang', this.currentLang().toLowerCase());
      }
    });
  }

  init()
  {
    this.currentLang.set(localStorage?.getItem('lang'));
    this.translate.addLangs(['en', 'ka']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.currentLang().toLowerCase());
  }
}
