import { Component } from '@angular/core';
import { Link } from '../../ui/link/link';

@Component({
  imports: [Link],
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly year = new Date().getFullYear();
}
