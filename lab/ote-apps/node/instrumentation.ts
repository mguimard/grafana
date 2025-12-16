import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

// see https://opentelemetry.io/docs/languages/js/resources/
const sdk = new opentelemetry.NodeSDK({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: "my-app",
        [ATTR_SERVICE_VERSION]: "1.2.3",
        customAttr: 'customValue',
        foo: 'bar',
        'deployment.environment.name': 'lab'
    }),

    traceExporter: new OTLPTraceExporter({
        // optional - default url is http://localhost:4318/v1/traces
        url: process.env.OTE_TRACE_ENDPOINT || 'http://localhost:4318/v1/traces',
        // optional - collection of custom headers to be sent with each request, empty by default
        headers: {}
    }),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: process.env.OTE_METRICS_ENDPOINT || 'http://localhost:4318/v1/metrics',
            //url: '<your-otlp-endpoint>/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
            headers: {}, // an optional object containing custom headers to be sent with each request
        }),
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();