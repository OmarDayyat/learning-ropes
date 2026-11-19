import { Routes } from '@angular/router';
import { Home } from './home/home';
import { lessonTitle } from './lessons/lesson-title';

export const routes: Routes = [
  { path: '', component: Home, title: 'Learning Ropes' },
  {
    path: 'lessons',
    loadComponent: () => import('./lessons/lesson-list/lesson-list').then((m) => m.LessonList),
    title: 'Lessons',
  },
  {
    path: 'lessons/:slug',
    loadComponent: () => import('./lessons/lesson-page/lesson-page').then((m) => m.LessonPage),
    title: lessonTitle,
  },
];
