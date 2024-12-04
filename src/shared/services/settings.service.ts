import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    setLocale(language: string) {
        localStorage.setItem('language', language);
        window.location.reload();
    }

    getLocale(): string {
        return localStorage.getItem('language') || 'hu-HU';
    }
}