import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

import { FooterComponent } from "./footer/footer.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MainComponent } from "./main/main.component";
import {LangService} from './services/lang.service';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TopNavComponent, MatExpansionModule, CommonModule, MainComponent],
  providers:[LangService, ThemeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  constructor(private langService: LangService, private themeService: ThemeService){}
  
  ngOnInit() {
    try
    {
      this.langService.init();
      this.themeService.init();
    }
    catch(e)
    {
      console.log(e);
    }
  }
}