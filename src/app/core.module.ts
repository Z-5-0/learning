import { NgModule, LOCALE_ID } from "@angular/core";
import { SettingsService } from 'src/shared/services/settings.service';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu);

@NgModule({
    providers: [
        {
            provide: LOCALE_ID,
            deps: [SettingsService],
            useFactory: (settingsService: SettingsService) => settingsService.getLocale()
        }
    ]
})

export class CoreModule {

}