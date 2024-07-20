# Codde Assessment Angular UI

## Prerequisites

- Knowledge of [Angular 18](https://angular.dev/overview)
- [Angular Environment](https://v17.angular.io/guide/setup-local) setup on your machine
- [Node](https://nodejs.org/en/download/package-manager) installed on your machine
- [Git](https://git-scm.com/download/) installed on your machine

&nbsp;

## Repository Overview

```bash
/CodeAssessmentUI
│
├── /.husky             # Pre Commits
├── /src
│   ├── /app
│   │   ├── /core       # Services, infrastructure & middleware
│   │   ├── /features   # Independent page modules and components
│   │   ├── /shared     # Shared models and components
│   │   └── ...
│   ├── /assets
│   ├── /environments   # Environment configuration
│   ├── main.ts
│   ├── styles.css
│   └── ...
├── tailwind.config.js  # Root style configuration
└── README.md
```

&nbsp;

## Getting Started / Running the app

### Install Prerequisites

```bash
npm i
```

### Start the development server

```bash
ng serve
```

### View the app in browser

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

&nbsp;

## Contributing

### Code scaffolding

Run `ng generate component component-name` to generate a new component.

> You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Building the app

```bash
ng build
```

### Running unit tests

```bash
ng test
```

### Code Clean Up

```bash
npx prettier . --write
npx eslint src --fix
```

## Documentation

[Angular Standards](https://angular.dev/style-guide)
[Security Standards](https://angular.dev/best-practices/security)
[HTTP Client](https://angular.dev/guide/http/setup)
[Configure Middleware](https://angular.dev/guide/http/interceptors)
[ES Lint Configuration](https://eslint.org/docs/latest/contribute/development-environment)
[Prettier Configuration](https://prettier.io/docs/en/install.html)
