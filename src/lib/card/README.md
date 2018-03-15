# Card

`<gh-card>` is a visual container for wrapping a wide variety of contents.
In addition to the custom content, the card can also hold some special sections:
- `<gh-card-title>` - The title of this card, needs to be defined to show the card's header
- `<gh-card-subtitle`> - Right below the title, a subtitle can be placed.
- `<gh-card-icon>` - An icon in the top left corner of the card. Use `<gh-icon>` for it.
- `<gh-card-action>` - Your place to add action buttons. Will be displayed in the top right corner. Use the buttons `secondary` variant.

**Example:**
```html
<gh-card>
  <gh-card-icon><gh-icon svgIcon="agent"></gh-icon></gh-card-icon>
  <gh-card-title>Top 3 JavaScript errors</gh-card-title>
  <gh-card-subtitle>Some subtitle</gh-card-subtitle>
  <gh-card-actions><button gh-button variant="secondary">Some Action</button></gh-card-actions>
  The card is not an interactive element, therefore, there are no hover, active and disabled card.
</gh-card>
```

## Accessibility
Card can be used in a wide variety of scenarios and can contain many different types of content.
Due to this dynamic nature, the appropriate accessibility treatment depends on how `<gh-card>` is used.

There are several ARIA roles that communicate that a portion of the UI represents some semantically meaningful whole.
Depending on what the content of the card means to your application, role="group", role="region", or a landmark role should typically be applied.

A role is not necessary when the card is used as a purely decorative container that does not convey a meaningful grouping of related content for a single subject.
In these cases, the content of the card should follow standard practices for document content.
