import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public title?: string;
  public subtitle?: string;
  public web?: string;

  constructor() { 
    this.title = "Cristhian Mayuri";
    this.subtitle = "Desarrollador Web y de aplicaciones";
    this.web = "https://mayuelcuarto.github.io";
  }
}
