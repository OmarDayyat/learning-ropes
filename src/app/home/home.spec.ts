import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the site name', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Learning Ropes');
  });

  it('should show one sentence about the project', () => {
    expect(compiled.querySelector('p')?.textContent).toContain(
      'A website about learning Git and GitHub as part of a team, built while learning it.',
    );
  });
});
