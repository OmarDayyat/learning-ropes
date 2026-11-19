import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  /** true: only highlight on this exact URL. false: also highlight on pages below it. */
  exact: boolean;
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-site-header',
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly links: readonly NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'Lessons', path: '/lessons', exact: false },
  ];
}
