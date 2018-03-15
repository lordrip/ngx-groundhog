# Context Dialog

The Angular Groundhog Context Dialog creates a container thats hidden inside an overlay. It is possible to disable the entire context dialog. The context dialog traps the focus inside the overlay until it is closed again. It sets the focus to the previously focused element when closed.

**Example**
```html
<gh-context-dialog>
  <p>Some content</p>
</gh-context-dialog>
```

## Accessibility

Context dialogs without should be given a meaningful label via aria-label, because the button does not have a text.

## Components

### Context dialog

```html
<gh-context-dialog>
```

#### Properties

Inherited by mixinTabIndex
```typescript
@Input('tabIndex')
tabIndex: number
```
Gets and sets the tabIndex on the context dialog, defaults to 0

Inherited by mixinDisabled
```typescript
@Input('disabled')
disabled: boolean
```
Gets and sets the disabled property on the context dialog.

Inherited by mixinColor
```typescript
@Input('color')
color: ThemePalette
```
Gets and sets the ThemePaletter for the context dialog

```typescript
@Input('aria-label')
ariaLabel: string
```
Aria label of the context dialog trigger button.

```typescript
@Output()
openedChanged: EventEmitter<boolean>
```
Event emitted when the context dialog opens or closes.

```typescript
panelOpen: boolean
```
Returns wether or not the panel is open

#### Methods

```typescript
open
```
Opens the context dialog

```typescript
close
```
Closes the context dialog

```typescript
focus
```
Focuses the context dialog
