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

    '@dynatrace/ngx-groundhog': 'dist/packages/ngx-groundhog/public-api.js',

    '@dynatrace/ngx-groundhog/button': 'dist/packages/ngx-groundhog/button/index.js',
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
