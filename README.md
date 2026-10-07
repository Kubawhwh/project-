# Book Harbor

Front-endowa aplikacja CRUD w React bez backendu. Dane działają tylko w stanie aplikacji i po odświeżeniu wracają do zestawu startowego.

## Funkcje

- lista książek z najważniejszymi danymi;
- dodawanie, edycja i usuwanie;
- wspólny formularz dla dodawania i edycji;
- reużywalny dialog do formularza i potwierdzenia usuwania;
- wyszukiwanie po tytule, filtrowanie po gatunku i sortowanie;
- paginacja z limitem 5 elementów na stronę;
- walidacja formularza z czytelnymi komunikatami błędów;
- komunikat pustego stanu.

## Uruchomienie

```bash
npm install
npm run dev
```

## Struktura

- `src/App.jsx` - cała logika CRUD i komponenty pomocnicze;
- `src/main.jsx` - start aplikacji;
- `src/styles.css` - style;
- `index.html` - punkt wejścia Vite.
