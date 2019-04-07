# andrew-fec-service (ExtraDetails Component)

Recreates the extra details component of goodreads.com. The component is minimized when first rendered and can be expanded to its full view by clicking the more button.

## Related Projects

  - https://github.com/hrr37-hermes-4/hrr37-FEC-Ginger-service
  - https://github.com/hrr37-hermes-4/hrr37-FEC-Ginger-proxy
  - https://github.com/hrr37-hermes-4/hannah-service
  - https://github.com/hrr37-hermes-4/hannah-proxy
  - https://github.com/hrr37-hermes-4/kazshige-proxy
  - https://github.com/hrr37-hermes-4/kazshige-service

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
Multiple npm scripts provided for convenience. View full list at package.json

Basic startup of project after installing dependcies:
1. Seed database with npm script
> To seed database use:
```sh
  npm run seed
```
> To erase data for reseeding use:
```sh
  npm run drop:tables
```

2. Start server with node or nodemon
> To start server with node use:
```sh
  npm run start
```
>To start server with nodemon, install nodemon with npm -i nodemon then use:
```sh
  npm run start:dev
```

3. Build and bundle client side code with webpack
```sh
  npm run build:dev
```

4. View module at http://localhost/3001/books/:id
> Id is any number between 1-100 representing 100 books

5. Test project with jest
```sh
  npm test
```


## Requirements
Main Development Modules
- Node 10.14.x
- Express
- Mysql with bluebird promisification
- React with styled-components

Main Testing Modules
- Jest
- Supertest
- Enzyme

## Development

### Installing Dependencies

From within the root directory:

```sh
  npm install
```
