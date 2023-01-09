// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
Sentry.init({
  dsn: "https://e1445423d3084a8e9ae3d0685cd91124@o1410679.ingest.sentry.io/4503964765782016",
  tracesSampleRate: 1.0,
  environment: "development",
  release: "development@1.0.0",
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps

  // beforeSend(event, hint) {
  //   // Check if it is an exception, and if so, show the report dialog
  //   if (event.exception) {
  //     Sentry.showReportDialog({ eventId: event.event_id })
  //   }
  //   return event
  // },
})
