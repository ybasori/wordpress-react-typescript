# Wordpress React Typescript

## Stack used:

- Backend:
  - Wordpress - PHP - MySQL
- Frontend:
  - React - Typescript
  - Bootstrap
- Development mode:
  - Webpack (with hot reload)
  - Eslint

## After download or clone the repo:

In root directory:

    npm install
    composer install

## Wordpress plugin you should install:

- JWT Authentication for WP-API
- Custom Post UI
- Advanced Custom Fields
- ACF to Rest API

## For development:

### Wordpress settings:

#### General setting:

| Label                   | Value                 |
| ----------------------- | --------------------- |
| Wordpress address (url) | http://localhost:9000 |
| Site address (url)      | http://localhost:8000 |

#### Permalink setting

| Label           | Option           | Value          |
| --------------- | ---------------- | -------------- |
| Common settings | Custom structure | `/%postname%/` |

Go to public_html directory:

    php -S 127.0.0.1:8000

In root directory:

    npm run dev

Open browser, go to:

    http://localhost:9000

It's a proxy from port 9000 to 8000 for development purpose.

## For production

Before deploy to production, run:

    npm run build

### After Deploy:

- Set index of your website to `public_html`
- Clear cache of your browser

### Wordpress settings:

#### General setting

| Label                   | Value             |
| ----------------------- | ----------------- |
| Wordpress address (url) | http://domain.com |
| Site address (url)      | http://domain.com |

#### Permalink setting

| Label           | Option           | Value          |
| --------------- | ---------------- | -------------- |
| Common settings | Custom structure | `/%postname%/` |
