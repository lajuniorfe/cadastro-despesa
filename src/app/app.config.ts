import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';

registerLocaleData(localePt); // Registre os dados de localidade antes de configurar os provedores.

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: PrimeNGConfig,
      useFactory: () => {
        const config = new PrimeNGConfig();
        config.setTranslation({
          accept: 'Accept',
          reject: 'Cancel',
          //translations
        });
        return config;
      },
    },
  ],
};
