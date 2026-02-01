import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('jquery').then((response) => {
        const $ = response.default;
        $('#logo').on('click', function(e){
          e.preventDefault();
          $('header').css('background', 'green')
                     .css('height', '50px');
        });
      });
    }
  }
}
