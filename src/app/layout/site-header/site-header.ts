import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-site-header',
  templateUrl: './site-header.html',
})
export class SiteHeader {}
