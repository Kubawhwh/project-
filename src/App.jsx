import { useMemo, useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Rozwój osobisty",
    year: 2018,
    pages: 320,
    read: true,
    format: "ebook",
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science fiction",
    year: 1965,
    pages: 604,
    read: true,
    format: "physical",
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    genre: "Fantasy",
    year: 1937,
    pages: 310,
    read: false,
    format: "audiobook",
  },
  {
    id: 4,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science fiction",
    year: 2021,
    pages: 496,
    read: false,
    format: "physical",
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Technologia",
    year: 2008,
    pages: 464,
    read: true,
    format: "ebook",
  },
  {
    id: 6,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Historia",
    year: 2011,
    pages: 443,
    read: true,
    format: "physical",
  },
  {
    id: 7,
    title: "The Martian",
    author: "Andy Weir",
    genre: "Science fiction",
    year: 2014,
    pages: 369,
    read: false,
    format: "audiobook",
  },
  {
    id: 8,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Rozwój osobisty",
    year: 2016,
    pages: 304,
    read: true,
    format: "ebook",
  },
  {
    id: 9,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    genre: "Fantasy",
    year: 2007,
    pages: 662,
    read: false,
    format: "physical",
  },
  {
    id: 10,
    title: "Neuromancer",
    author: "William Gibson",
    genre: "Science fiction",
    year: 1984,
    pages: 271,
    read: false,
    format: "ebook",
  },
  {
    id: 11,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Technologia",
    year: 1999,
    pages: 352,
    read: true,
    format: "physical",
  },
  {
    id: 12,
    title: "Educated",
    author: "Tara Westover",
    genre: "Biografia",
    year: 2018,
    pages: 352,
    read: false,
    format: "audiobook",
  },
];

const GENRES = [
  "Wszystkie",
  "Science fiction",
  "Fantasy",
  "Technologia",
  "Rozwój osobisty",
  "Historia",
  "Biografia",
];
const SORTS = [
  { value: "title-asc", label: "Tytuł A-Z" },
  { value: "title-desc", label: "Tytuł Z-A" },
  { value: "year-asc", label: "Rok rosnąco" },
  { value: "year-desc", label: "Rok malejąco" },
];
const FORMATS = [
  { value: "physical", label: "Papierowa" },
  { value: "ebook", label: "E-book" },
  { value: "audiobook", label: "Audiobook" },
];
const ITEMS_PER_PAGE = 5;

const createEmptyForm = () => ({
  title: "",
  author: "",
  genre: "Science fiction",
  year: "",
  pages: "",
  read: false,
  format: "physical",
});

const toFormValue = (book) => ({
  title: book.title,
  author: book.author,
  genre: book.genre,
  year: String(book.year),
  pages: String(book.pages),
  read: book.read,
  format: book.format,
});

const normalize = (value) => value.trim().toLowerCase();

const formatLabel = (value) =>
  FORMATS.find((item) => item.value === value)?.label ?? value;

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Wszystkie");
  const [sortBy, setSortBy] = useState("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [formValue, setFormValue] = useState(createEmptyForm());
  const [errors, setErrors] = useState({});

  const filteredBooks = useMemo(() => {
    const searchTerm = normalize(search);

    return books
      .filter((book) =>
        searchTerm ? normalize(book.title).includes(searchTerm) : true,
      )
      .filter((book) => (genre === "Wszystkie" ? true : book.genre === genre))
      .sort((left, right) => {
        if (sortBy === "title-asc")
          return left.title.localeCompare(right.title, "pl");
        if (sortBy === "title-desc")
          return right.title.localeCompare(left.title, "pl");
        if (sortBy === "year-asc") return left.year - right.year;
        return right.year - left.year;
      });
  }, [books, genre, search, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;
  const visibleBooks = filteredBooks.slice(start, start + ITEMS_PER_PAGE);

  // Otwiera formularz dla nowego wpisu i resetuje jego stan.
  const openCreateForm = () => {
    setEditingId(null);
    setFormValue(createEmptyForm());
    setErrors({});
    setFormOpen(true);
  };

  // Otwiera formularz z danymi wybranej książki.
  const openEditForm = (book) => {
    setEditingId(book.id);
    setFormValue(toFormValue(book));
    setErrors({});
    setFormOpen(true);
  };

  // Otwiera dialog potwierdzenia usuwania dla wybranej książki.
  const openDeleteDialog = (book) => {
    setBookToDelete(book);
    setDeleteOpen(true);
  };

  // Sprawdza poprawność danych wpisanych w formularzu.
  const validate = (value) => {
    const nextErrors = {};

    if (!value.title.trim()) nextErrors.title = "Tytuł jest wymagany.";
    if (!value.author.trim()) nextErrors.author = "Autor jest wymagany.";
    if (!value.genre) nextErrors.genre = "Wybierz gatunek.";

    const year = Number(value.year);
    if (!Number.isInteger(year) || year < 1500 || year > 2100)
      nextErrors.year = "Rok musi być z zakresu 1500-2100.";

    const pages = Number(value.pages);
    if (!Number.isInteger(pages) || pages < 1)
      nextErrors.pages = "Liczba stron musi być większa od 0.";

    if (!value.format) nextErrors.format = "Wybierz format.";

    return nextErrors;
  };

  // Zapisuje nową książkę albo aktualizuje istniejącą.
  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(formValue);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const nextBook = {
      id: editingId ?? Date.now(),
      title: formValue.title.trim(),
      author: formValue.author.trim(),
      genre: formValue.genre,
      year: Number(formValue.year),
      pages: Number(formValue.pages),
      read: formValue.read,
      format: formValue.format,
    };

    setBooks((current) =>
      editingId
        ? current.map((book) => (book.id === editingId ? nextBook : book))
        : [nextBook, ...current],
    );
    setFormOpen(false);
    setEditingId(null);
    setFormValue(createEmptyForm());
    setErrors({});
    setCurrentPage(1);
  };

  // Usuwa książkę po akceptacji dialogu.
  const handleDelete = () => {
    if (!bookToDelete) return;

    setBooks((current) =>
      current.filter((book) => book.id !== bookToDelete.id),
    );
    setDeleteOpen(false);
    setBookToDelete(null);
  };

  // Czyści wszystkie filtry i wraca na pierwszą stronę.
  const clearFilters = () => {
    setSearch("");
    setGenre("Wszystkie");
    setSortBy("title-asc");
    setCurrentPage(1);
  };

  const changeFilter = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const changePage = (nextPage) => {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <div className="app-shell">
      <header className="hero panel">
        <div>
          <h1>Book Harbor</h1>
          <p className="hero-text">
            Aplikacja do zarządzania książkami z lokalnym stanem, formularzem,
            dialogami, paginacją i filtrowaniem.
          </p>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={openCreateForm}
        >
          Dodaj książkę
        </button>
      </header>

      <main className="content-grid">
        <section className="panel filters-bar" aria-label="Filtry i sortowanie">
          <label>
            <span>Szukaj po tytule</span>
            <input
              type="search"
              value={search}
              onChange={(event) => changeFilter(setSearch)(event.target.value)}
              placeholder="Np. Dune"
            />
          </label>
          <label>
            <span>Gatunek</span>
            <select
              value={genre}
              onChange={(event) => changeFilter(setGenre)(event.target.value)}
            >
              {GENRES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Sortowanie</span>
            <select
              value={sortBy}
              onChange={(event) => changeFilter(setSortBy)(event.target.value)}
            >
              {SORTS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <div className="filters-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={clearFilters}
            >
              Wyczyść
            </button>
          </div>
        </section>

        <section className="panel list-panel">
          <div className="section-head">
            <div>
              <h2>Lista książek</h2>
              <p>
                {filteredBooks.length} wyników, strona {safePage} z {totalPages}
              </p>
            </div>
            <button
              type="button"
              className="secondary-button"
              onClick={openCreateForm}
            >
              Nowy wpis
            </button>
          </div>

          {visibleBooks.length > 0 ? (
            <div className="book-list">
              {visibleBooks.map((book) => (
                <article key={book.id} className="book-card">
                  <div className="book-card__top">
                    <div>
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </div>
                    <span className="chip">{book.genre}</span>
                  </div>

                  <dl className="book-meta">
                    <div>
                      <dt>Rok</dt>
                      <dd>{book.year}</dd>
                    </div>
                    <div>
                      <dt>Strony</dt>
                      <dd>{book.pages}</dd>
                    </div>
                    <div>
                      <dt>Format</dt>
                      <dd>{formatLabel(book.format)}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{book.read ? "Przeczytana" : "Do przeczytania"}</dd>
                    </div>
                  </dl>

                  <div className="book-card__actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => openEditForm(book)}
                    >
                      Edytuj
                    </button>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => openDeleteDialog(book)}
                    >
                      Usuń
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>
                <h3>Brak wyników</h3>
                <p>Zmień filtr, sortowanie albo dodaj nową książkę.</p>
              </div>
              <button type="button" onClick={openCreateForm}>
                Dodaj pierwszą książkę
              </button>
            </div>
          )}

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </section>
      </main>

      <Dialog
        open={formOpen}
        title={editingId ? "Edytuj książkę" : "Dodaj książkę"}
        description="Ten sam formularz obsługuje dodawanie i edycję wpisu."
        onClose={() => setFormOpen(false)}
      >
        <form className="book-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              <span>Tytuł</span>
              <input
                type="text"
                value={formValue.title}
                onChange={(event) =>
                  setFormValue({ ...formValue, title: event.target.value })
                }
              />
              {errors.title ? (
                <small className="field-error">{errors.title}</small>
              ) : null}
            </label>
            <label>
              <span>Autor</span>
              <input
                type="text"
                value={formValue.author}
                onChange={(event) =>
                  setFormValue({ ...formValue, author: event.target.value })
                }
              />
              {errors.author ? (
                <small className="field-error">{errors.author}</small>
              ) : null}
            </label>
            <label>
              <span>Gatunek</span>
              <select
                value={formValue.genre}
                onChange={(event) =>
                  setFormValue({ ...formValue, genre: event.target.value })
                }
              >
                {GENRES.filter((item) => item !== "Wszystkie").map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.genre ? (
                <small className="field-error">{errors.genre}</small>
              ) : null}
            </label>
            <label>
              <span>Rok wydania</span>
              <input
                type="number"
                value={formValue.year}
                onChange={(event) =>
                  setFormValue({ ...formValue, year: event.target.value })
                }
              />
              {errors.year ? (
                <small className="field-error">{errors.year}</small>
              ) : null}
            </label>
            <label>
              <span>Liczba stron</span>
              <input
                type="number"
                value={formValue.pages}
                onChange={(event) =>
                  setFormValue({ ...formValue, pages: event.target.value })
                }
              />
              {errors.pages ? (
                <small className="field-error">{errors.pages}</small>
              ) : null}
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={formValue.read}
                onChange={(event) =>
                  setFormValue({ ...formValue, read: event.target.checked })
                }
              />
              <span>Przeczytana książka</span>
            </label>
          </div>

          <fieldset className="radio-group">
            <legend>Format</legend>
            <div className="radio-row">
              {FORMATS.map((item) => (
                <label key={item.value}>
                  <input
                    type="radio"
                    name="format"
                    value={item.value}
                    checked={formValue.format === item.value}
                    onChange={(event) =>
                      setFormValue({ ...formValue, format: event.target.value })
                    }
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
            {errors.format ? (
              <small className="field-error">{errors.format}</small>
            ) : null}
          </fieldset>

          <div className="dialog-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setFormOpen(false)}
            >
              Anuluj
            </button>
            <button type="submit">
              {editingId ? "Zapisz zmiany" : "Dodaj książkę"}
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog
        open={deleteOpen}
        title="Usuń książkę"
        description={
          bookToDelete
            ? `Czy na pewno chcesz usunąć: ${bookToDelete.title}?`
            : "Usuń wybrany wpis."
        }
        onClose={() => setDeleteOpen(false)}
        actions={
          <>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setDeleteOpen(false)}
            >
              Anuluj
            </button>
            <button
              type="button"
              className="danger-button"
              onClick={handleDelete}
            >
              Usuń
            </button>
          </>
        }
      >
        <p>
          Usunięcie działa tylko w tej sesji przeglądarki, bo projekt jest
          wyłącznie front-endowy.
        </p>
      </Dialog>
    </div>
  );
}

function Dialog({ open, title, description, children, actions, onClose }) {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onMouseDown={onClose}>
      <section
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-head">
          <div>
            <h2 id="dialog-title">{title}</h2>
            {description ? <p>{description}</p> : null}
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Zamknij dialog"
          >
            ×
          </button>
        </div>
        <div className="dialog-body">{children}</div>
        {actions ? <div className="dialog-actions">{actions}</div> : null}
      </section>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  for (let page = start; page <= end; page += 1) pages.push(page);
  if (pages[0] !== 1) pages.unshift(1);
  if (pages[pages.length - 1] !== totalPages) pages.push(totalPages);

  return (
    <nav className="pagination" aria-label="Paginacja wyników">
      <button
        type="button"
        className="secondary-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Poprzednia
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={
            page === currentPage ? "page-button is-active" : "page-button"
          }
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="secondary-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Następna
      </button>
    </nav>
  );
}

export default App;
