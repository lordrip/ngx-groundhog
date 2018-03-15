# Checkbox

`<gh-checkbox>` provides the same functionality as a native <input type="checkbox"> enhanced with styling and animations.

```html
  <gh-checkbox value="aberfeldy">Aberfeldy</gh-checkbox>
```

## Angular forms

`<gh-checkbox>` is compatible with `@angular/forms` and supports both `FormsModule` and `ReactiveFormsModule`.

Accessibility
The `<gh-checkbox>` uses an internal `<input type="checkbox">` to provide an accessible experience.
This internal checkbox receives focus and is automatically labelled by the text content of the `<gh-checkbox>` element.

Checkboxes without text or labels should be given a meaningful label via aria-label or aria-labelledby.
