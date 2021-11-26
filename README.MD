# wordpress-react-typescript

stack used:

- wordpress - php - mysql
- react js - typescript
- webpack - hot reload
- bootstrap

wordpress plugin you should install:

- JWT Authentication for WP-API
- Custom Post UI
- Advanced Custom Fields
- ACF to Rest API

wordpress setting for development:

- wordpress address (url) set to http://localhost:9000
- site address (url) set to http://localhost:8000

wordpress setting for production:

- wordpress address (url) set to http://domain.com
- site address (url) set to http://domain.com

wordpress setting for development and production:

- Permalink set to custom structure and fill the input with /%postname%/

Run in development:
to public_html directory:
php -S 127.0.0.1:8000

root directory:
npm run dev

open browser to
http://localhost:9000

It's a proxy from port 9000 to 8000 for development purpose.
