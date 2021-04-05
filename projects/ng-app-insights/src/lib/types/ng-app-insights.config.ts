export type NgAppInsightsConfiguration = {
    applicationVersion: string;
    pageViewPostfix: string;
    cookieDomain: string,
    disableCorrelationHeaders: boolean,
    disableDataLossAnalysis: boolean,
    disableTelemetry: boolean,
    enableAutoRouteTracking: boolean,
    enableCorsCorrelation: boolean,
    instrumentationKey: string,
    sessionExpirationMs: number,
};

