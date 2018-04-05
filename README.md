
[![npm version](https://badge.fury.io/js/%40dynatrace%2Fngx-groundhog.svg)](https://badge.fury.io/js/%40dynatrace%2Fngx-groundhog)
[![Build Status](https://travis-ci.org/Dynatrace/ngx-groundhog.svg?branch=master)](https://travis-ci.org/Dynatrace/ngx-groundhog)

# Angular Groundhog

## Available features & Status

| Feature            | Status      | Version        | Docs        | Issue/PR    |
|--------------------|-------------|-------------|-------------|-------------|
| Button             | Finished    | >= 0.1.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/button/README.md)            | - |
| Card               | Finished    | >= 0.2.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/card/README.md)            | - |
| Checkbox           | Finished    | >= 0.5.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/checkbox/README.md)          | - |
| Form field         | Finished    | >= 0.1.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/form-field/README.md)        | - |
| Icon               | Finished    | >= 0.1.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/icon/README.md)              | - |
| Input              | Finished    | >= 0.1.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/input/README.md)             | - |
| Progress circle    | Finished    | >= 0.1.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/progress-circle/README.md)   | - |
| Select             | Finished    | >= 0.1.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/select/README.md)            | - |
| Tile               | Finished    | >= 0.1.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/tile/README.md)              | - |
| Theming            | Finished    | >= 0.2.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/theming/README.md)           | - |
| Context menu       | Finished    | >= 0.2.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/context-menu/README.md)      | - |
| Radio button       | Finished    | >= 0.3.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/radio/README.md) | - |
| Loading distractor | Finished    | >= 0.4.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/loading-distractor/README.md) | - |
| Context dialog     | Finished    | >= 0.5.0    | [Docs](https://github.com/Dynatrace/ngx-groundhog/blob/master/src/lib/context-dialog/README.md)    | - |
| Expandable         | In-progress | - | - | #47 |
| Datepicker         | In-progress | - | - | #49 / #34 |

## Getting started

#### Step 1: Install the ngx-groundhog and Angular CDK
`npm install --save @dynatrace/ngx-groundhog @angular/cdk`    
or      
`yarn add @dynatrace/ngx-groundhog @angular/cdk`

#### Step 2: Animations
Some ngx-groundhog components depend on the Angular animations module.
If you want these animations to work in your app, you have to install the `@angular/animations` module and include the `BrowserAnimationsModule` in your app.    

`npm install --save @angular/animations`    
or      
`yarn add @angular/animations`

```ts
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class AppModule { }
```

If you don't want to add another dependency to your project, you can use the NoopAnimationsModule.

```ts
import {NoopAnimationsModule} from '@dynatrace/ngx-groundhog';

@NgModule({
  ...
  imports: [NoopAnimationsModule],
  ...
})
export class AppModule { }
```

**Note:** @angular/animations uses the WebAnimation API that isn't supported by all browsers yet. If you want to support animations in these browsers, you'll have to [include a polyfill](https://github.com/web-animations/web-animations-js).

#### Step 3: Import the component modules

Import the NgModule for each component you want to use:
```ts
import {GhButtonModule, GhSelectModule} from '@angular/material';

@NgModule({
  ...
  imports: [GhButtonModule, GhSelectModule],
  ...
})
export class PizzaPartyAppModule { }
```

Alternatively, you can create a separate NgModule that imports all of the ngx-groundhog components that you will use in your application. You can then include this module wherever you'd like to use the components.

**Note:** Whichever approach you use, be sure to import the ngx-groundhog modules after Angular's BrowserModule, as the import order matters for NgModules.

#### Step 4: Include a theme

Including a theme is **required** to apply all of the core and theme styles to your application.

ngx-groundhog is shipping with multiple themes. Include the one that you are using in your global `styles.css`.

```
@import "~@dynatrace/ngx-groundhog/themes/turquoise.css";
```

If you want to use more themes in your app, import `~@dynatrace/ngx-groundhog/themes/all.css` instead-

## Development

#### Prerequisite
1. Make sure [node.js](https://nodejs.org) (Version 8 or greater) is installed
2. Run `npm install` to install all dependencies

#### Start Demo-App
Run `npm run demo-app` to start the demo-app on a local dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

#### Build
Run `npm run build` to build the project. The build artifacts will be stored in the dist/ directory.

#### Creating a new component
We created a schematic inside a the [ngx-groundhog-devkit repository](https://github.com/Dynatrace/ngx-groundhog-devkit) to make it more convenient to create new components. Please see the [readme](https://github.com/Dynatrace/ngx-groundhog-devkit/blob/master/README.md) for the command.
