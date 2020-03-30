# Rent-a-carAPI

## Start

  First we need to clone project and install all dependencies:

```bash
$ git clone github.com/haris-dajic/Rent-a-carAPI
$ cd Rent-a-carAPI
$ npm install
```
  Then we need to setup our Private Key for JWT, we do that as environment variable with the name 'rentacar_jwtPrivateKey'

  On windows:
  
    setx rentacar_jwtPrivateKey=OurPrivateKey123

  On Linux and Mac:

    export rentacar_jwtPrivateKey=OurPrivateKey123

  Start the application:

```bash
$ node index.js
```
## API routes

  All API routes are stored in json files in Postman routes folder.
  Import that files inside Postman and check API.


## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

  [MIT](LICENSE)
