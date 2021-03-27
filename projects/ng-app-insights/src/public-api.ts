// Event
export * from './lib/event/event.model';
export * from './lib/event/event.service';

// monitoring 

export * from './lib/enums/monitoring-event-type.enum';
export * from './lib/models/monitoring-error.model';
export * from './lib/models/monitoring-event.model';
export * from './lib/models/monitoring-page-view.model';
export { MonitoringService } from './lib/monitoring.service'

export { INgAppInsightsService } from './lib/interfaces/ng-app-insights.service'
export { NgAppInsightsModule } from './lib/ng-app-insights.module'
export { NG_APP_INSIGHTS_CONFIG } from './lib/constants'
export { NgAppInsightsConfiguration } from './lib/types/ng-app-insights.config'
