import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  private darkThemeSubject = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.darkThemeSubject.asObservable();

  constructor() {
    this.loadInitialTheme();
  }

  loadInitialTheme(): void {
    const stored = localStorage.getItem(this.storageKey) as 'light' | 'dark' | null;
    const isDark = stored ? stored === 'dark' : this.prefersDark;
    this.applyTheme(isDark);
  }

  toggleTheme(): void {
    this.applyTheme(!this.darkThemeSubject.value);
  }

  applyTheme(isDark: boolean): void {
    this.darkThemeSubject.next(isDark);
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }
}
