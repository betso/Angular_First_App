import { inject, Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor() { }

  translate: TranslateService = inject(TranslateService);

  init()
  {
    this.translate.addLangs(['en', 'ka']);
    this.translate.setDefaultLang('en');
  }

  changeLang(lang: string)
  {
    this.translate.use(lang.toLowerCase());
    if (localStorage != undefined)
      localStorage.setItem('lang', lang.toLowerCase());
  }

  getLang() : string
  {
    let l = localStorage.getItem('lang');

    return l;
  }

  loadCurrentLang()
  {
    let lang = localStorage.getItem('lang');
    this.translate.use(lang.toLowerCase());
  }
}
