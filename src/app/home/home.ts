import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../ui/badge/badge';
import { Card } from '../ui/card/card';
import { Link } from '../ui/link/link';
import { LEARNING_PATH } from './learning-path';

@Component({
  imports: [RouterLink, Badge, Card, Link],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  protected readonly steps = LEARNING_PATH;
}
