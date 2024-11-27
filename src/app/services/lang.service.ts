import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LangService
{
  translate: TranslateService = inject(TranslateService);
  document = inject(DOCUMENT);
  currentLang = signal(this.document?.defaultView?.localStorage?.getItem('lang') || 'en');

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
    this.translate.addLangs(['en', 'ka']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.currentLang().toLowerCase());
  }
}
