# Loading Distractor

`<gh-loading-spinner>` and `<gh-loading-distractor>` are a circular indicators of activity (eg. loading).

## Progress spinner
Supports two sizes; `default` and `small`.

```html
<gh-loading-spinner></gh-loading-spinner>
<gh-loading-spinner size="small"></gh-loading-spinner>
```

## Progress distractor
The `<gh-loading-distractor>` wraps the spinner and adds a label next to it.

```html
<gh-loading-distractor>Loading...</gh-loading-distractor>
```

## Accessibility
Each `<gh-loading-spinner>` should be given a meaningful label via `aria-label` or `aria-labelledby`.
`<gh-loading-distractor>` will set the `aria-labelledby` attributes automatically.
