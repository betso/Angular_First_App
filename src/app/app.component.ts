import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "./footer/footer.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MainComponent } from "./main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TranslateModule, FooterComponent, TopNavComponent, MatExpansionModule, CommonModule, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  constructor(private translate: TranslateService)
  {
    this.translate.addLangs(['en', 'ka']);
    this.translate.setDefaultLang('en');
  };
  ngOnInit() {
    try
    {
      if (localStorage != undefined)
      {
        var lang = localStorage.getItem('lang');
        if (lang != null)
          this.translate.use(lang);

        var theme = localStorage.getItem('theme');
        if (theme != null)
        {
          document.body.classList.remove('light-theme');
          document.body.classList.remove('dark-theme');
          document.body.classList.add(theme);
        }
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }
}