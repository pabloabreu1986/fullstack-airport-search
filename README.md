# Ryanair - Task full stack developer

* Write a RESTful API application which serves autocomplete informations about
  the airports consumed from an external API
* Write a web client ( webpage ) which will consume the RESTful API created
  and display the list of available airports while typing on the inputs ( aka
  google places autocomplete )
* Needs to be written in node >= 6

## SOLUTION - PABLO ABREU

To run the proyect execute the following commands:

* `cd ryanair-express-ang`
* `npm install`
* `npm run all`

It will execute the both projects.

## RESTful API

The application needs to consume the data from the following endpoint:

```
https://nodejs-tech-test.herokuapp.com/graphql
```

You can query which fields will be available in the response, this is the
list of all the possible fields:

```
Airport {
  iataCode: String
  name: String
  seoName: String
  coordinates: Coordinate
  base: Boolean
  countryCode: String
  regionCode: String
  cityCode: String
  currencyCode: String
  cityCode: String
  currencyCode: String
  routes: [String]
  seasonalRoutes: [String]
  categories: [String]
  priority: Int
}
Coordinate {
  latitude: Float,
  longitude: Float
}
```

You will need at least one field to start querying, eg:

```
https://nodejs-tech-test.herokuapp.com/graphql?query={airports {name, seoName}}
```

Will get back all the airports with only the `name` and `seoName` attached to it. 

You can also leverage graphiql to navigate fields of the response:

```
https://nodejs-tech-test.herokuapp.com/graphiql
```

### Autocomplete

The application needs to expose one API `/autocomplete` that accepts two
parameters:

* `query` Will be the search term
* `departure` Will contain the departure `iataCode` in case we are searching for a destination.

#### Query

Query parameter needs to implement the following conditions:

* Will search only if the parameter contains more than two letters
* Will search across the following fields:
  * `iataCode`
  * `name`
  * `seoName`
* Will return all and only the informations needed by the client.

#### Departure

Departure is an optional parameter that when present will filter the possible
airports based upon the departure routes.

Departure accept only an `iataCode` as parameter.

Route data structure is as the following:

```
routes: [
  "airport:BVA",
  "region:PROVENCE-ALPES-COTE_DAZUR_FRENCH_RIVIERA",
  "airport:CRL",
  "city:DUSSELDORF",
  "airport:MRS",
  "city:MARSEILLE",
  "airport:NRN",
  "city:BRUSSELS",
  "country:fr",
  "city:PARIS",
  "country:be",
  "country:de"
]
```

## Client

To consume the RESTful API you will need to write a client ( web page ) that
will consume it.

Think this as the Ryanair search on our homepage.

The requirements for the client are the following:

* Use any modern framework ( no restriction on this )
* Being served by the application

The application needs to be an integrated solution that will contain both
the client and the server.

## Workflow

* Fork the project on gitlab
* Do your magic
* Share your fork with @fortunatof_ryanair ( Reporter access )
