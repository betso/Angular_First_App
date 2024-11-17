import { Component, inject } from '@angular/core';
import { TranslateService, TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  translate: TranslateService = inject(TranslateService);
  translateText(lang: string)
  {
    this.translate.use(lang);
    if (localStorage != undefined)
      localStorage.setItem('lang', lang);
  }
}
