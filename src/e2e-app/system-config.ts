/** Type declaration for ambient System. */
declare const System: any;

// Apply the CLI SystemJS configuration.
System.config({
  paths: {
    'node:*': 'node_modules/*',
  },
  map: {
    'rxjs': 'node:rxjs',
    'main': 'main.js',
    'moment': 'node:moment/min/moment-with-locales.min.js',
    'tslib': 'node:tslib/tslib.js',

    // Angular specific mappings.
    '@angular/core': 'node:@angular/core/bundles/core.umd.js',
    '@angular/common': 'node:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'node:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'node:@angular/compiler/bundles/compiler.umd.js',
    '@angular/forms': 'node:@angular/forms/bundles/forms.umd.js',
    '@angular/router': 'node:@angular/router/bundles/router.umd.js',
    '@angular/animations': 'node:@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'node:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser': 'node:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser/animations':
      'node:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/platform-browser-dynamic':
      'node:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

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

    '@dynatrace/ngx-groundhog': 'dist/bundles/ngx-groundhog.umd.js',
    '@dynatrace/ngx-groundhog/core': 'dist/bundles/ngx-groundhog-core.umd.js',
    '@dynatrace/ngx-groundhog/checkbox': 'dist/bundles/ngx-groundhog-checkbox.umd.js',
    '@dynatrace/ngx-groundhog/button': 'dist/bundles/ngx-groundhog-button.umd.js',
    '@dynatrace/ngx-groundhog/input': 'dist/bundles/ngx-groundhog-input.umd.js',
    '@dynatrace/ngx-groundhog/radio': 'dist/bundles/ngx-groundhog-radio.umd.js',
    '@dynatrace/ngx-groundhog/form-field': 'dist/bundles/ngx-groundhog-form-field.umd.js',
    '@dynatrace/ngx-groundhog/tile': 'dist/bundles/ngx-groundhog-tile.umd.js',
    '@dynatrace/ngx-groundhog/context-menu': 'dist/bundles/ngx-groundhog-context-menu.umd.js',
    '@dynatrace/ngx-groundhog/context-dialog': 'dist/bundles/ngx-groundhog-context-dialog.umd.js',
    '@dynatrace/ngx-groundhog/theming': 'dist/bundles/ngx-groundhog-theming.umd.js',
    '@dynatrace/ngx-groundhog/icon': 'dist/bundles/ngx-groundhog-icon.umd.js',
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
