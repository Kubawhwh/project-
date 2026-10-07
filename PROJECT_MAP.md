# Project Map

## Main Files

### `src/App.jsx`

- Main application logic.
- Holds the React state for books, filters, sorting, pagination, dialogs, and the form.
- Contains the CRUD handlers: add, edit, delete.
- Contains the validation function for the form.
- Renders the whole UI structure: hero, filters, list, empty state, dialogs, and pagination.

### `src/styles.css`

- Responsible only for visual styling.
- Defines the color theme, spacing, layout, borders, shadows, and responsive behavior.
- Styles the page shell, hero section, filter bar, book cards, empty state, form, dialog, and pagination.
- Includes interactive states such as hover, focus-visible, disabled, active page, and danger buttons.
- Where to find it: [src/styles.css](src/styles.css)

### `src/main.jsx`

- Application entry point.
- Mounts `App` into the root DOM node.
- Imports `src/styles.css` so the whole app gets styled.

### `index.html`

- HTML entry file for Vite.
- Contains the root element where React renders the app.

### `package.json`

- Project manifest.
- Lists the dependencies and scripts.
- `npm run dev` starts Vite.
- `npm run build` creates a production build.

## Data And UI Structure

### `initialBooks` in `src/App.jsx`

- Seed data for the app.
- Contains 12 book items so pagination can be tested immediately.

### `GENRES`, `SORTS`, `FORMATS` in `src/App.jsx`

- Constant arrays used by the filters and the form.
- They keep the options centralized in one place.

### Form and dialog logic in `src/App.jsx`

- The same form is reused for creating and editing books.
- One dialog is used for the form.
- Another dialog is used for delete confirmation.

### Pagination logic in `src/App.jsx`

- Shows only 5 items per page.
- Recalculates the visible list after search, filter, sort, add, edit, or delete actions.

## What `styles.css` Is Responsible For

`src/styles.css` is the visual layer of the app. It does not control the data or the CRUD logic.

It handles:

- global theme and base page background;
- typography and spacing;
- layout of the full page;
- cards, panels, and dialogs;
- buttons, inputs, selects, and focus states;
- responsive behavior on smaller screens;
- visual feedback for active, disabled, hover, and error states.

## Quick Reading Order

1. Start with `src/App.jsx` to understand the logic.
2. Then open `src/styles.css` to see how the interface is styled.
3. Check `src/main.jsx` for the app entry.
4. Use `README.md` for quick run instructions.
