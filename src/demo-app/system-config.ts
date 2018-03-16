/** Type declaration for ambient System. */
declare const System: any;

// Configure the base path and map the different node packages.
System.config({
  paths: {
    'node:*': 'node_modules/*'
  },
  map: {
    'rxjs': 'node:rxjs',
    'main': 'main.js',
    'tslib': 'node:tslib/tslib.js',
    'moment': 'node:moment/min/moment-with-locales.min.js',

    // Angular specific mappings.
    '@angular/core': 'node:@angular/core/bundles/core.umd.js',
    '@angular/common': 'node:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'node:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'node:@angular/compiler/bundles/compiler.umd.js',
    '@angular/forms': 'node:@angular/forms/bundles/forms.umd.js',
    '@angular/animations': 'node:@angular/animations/bundles/animations.umd.js',
    '@angular/router': 'node:@angular/router/bundles/router.umd.js',
    '@angular/animations/browser': 'node:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations':
      'node:@angular/platform-browser/bundles/platform-browser-animations.umd',
    '@angular/platform-browser':
      'node:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic':
      'node:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

    // Angular CDK Mappings
    '@angular/cdk': 'node:@angular/cdk/bundles/cdk.umd.js',
    '@angular/cdk/a11y': 'node:@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/accordion': 'node:@angular/cdk/bundles/cdk-accordion.umd.js',
    '@angular/cdk/bidi': 'node:@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'node:@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/collections': 'node:@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/keycodes': 'node:@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/layout': 'node:@angular/cdk/bundles/cdk-layout.umd.js',
    '@angular/cdk/observers': 'node:@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': 'node:@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/platform': 'node:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': 'node:@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/scrolling': 'node:@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/stepper': 'node:@angular/cdk/bundles/cdk-stepper.umd.js',
    '@angular/cdk/table': 'node:@angular/cdk/bundles/cdk-table.umd.js',

    '@dynatrace/ngx-groundhog': 'dist/packages/ngx-groundhog/public-api.js',
    '@dynatrace/ngx-groundhog/button': 'dist/packages/ngx-groundhog/button/index.js',
    '@dynatrace/ngx-groundhog/card': 'dist/packages/ngx-groundhog/card/index.js',
    '@dynatrace/ngx-groundhog/checkbox': 'dist/packages/ngx-groundhog/checkbox/index.js',
    '@dynatrace/ngx-groundhog/core': 'dist/packages/ngx-groundhog/core/index.js',
    '@dynatrace/ngx-groundhog/form-field': 'dist/packages/ngx-groundhog/form-field/index.js',
    '@dynatrace/ngx-groundhog/icon': 'dist/packages/ngx-groundhog/icon/index.js',
    '@dynatrace/ngx-groundhog/input': 'dist/packages/ngx-groundhog/input/index.js',
    '@dynatrace/ngx-groundhog/loading-distractor':
      'dist/packages/ngx-groundhog/loading-distractor/index.js',
    '@dynatrace/ngx-groundhog/progress-circle':
      'dist/packages/ngx-groundhog/progress-circle/index.js',
    '@dynatrace/ngx-groundhog/radio': 'dist/packages/ngx-groundhog/radio/index.js',
    '@dynatrace/ngx-groundhog/select': 'dist/packages/ngx-groundhog/select/index.js',
    '@dynatrace/ngx-groundhog/tile': 'dist/packages/ngx-groundhog/tile/index.js',
    '@dynatrace/ngx-groundhog/theming': 'dist/packages/ngx-groundhog/theming/index.js',
    '@dynatrace/ngx-groundhog/context-menu':
      'dist/packages/ngx-groundhog/context-menu/index.js',
    '@dynatrace/ngx-groundhog/context-dialog':
      'dist/packages/ngx-groundhog/context-dialog/index.js',

  },
  packages: {
    // Thirdparty barrels.
    'rxjs': {main: 'index'},

    // Set the default extension for the root package, because otherwise the demo-app can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    }
  }
});
