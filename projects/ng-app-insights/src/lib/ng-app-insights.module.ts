import { ModuleWithProviders, NgModule } from '@angular/core';
import { NG_APP_INSIGHTS_CONFIG } from './constants';
import { NgAppInsightsConfiguration } from './types/ng-app-insights.config';

@NgModule({
  imports: [
  ],
})
export class NgAppInsightsModule {
  static forRoot(
    ngAppInsightsConfig: NgAppInsightsConfiguration,
  ): ModuleWithProviders<NgAppInsightsModule> {
    return {
      ngModule: NgAppInsightsModule,
      providers: [
        {
          provide: NG_APP_INSIGHTS_CONFIG,
          useValue: ngAppInsightsConfig
        }
      ]
    };
  }
}
