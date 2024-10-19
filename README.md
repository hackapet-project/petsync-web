# petsync-web
TBD

# API

### http://localhost:8000/v1/docs

- Swagger with the documentation for v1

## ENDPOINTS AND METHODS
### http://localhost:8000/v1/animals

- GET

Returns all the animals' data from the database

----

- POST

Given a JSON with an animal data, stores it in the database

### http://localhost:8000/v1/animals/:id

-- ID MUST BE TYPE INTEGER --

- GET

Returns the matching animal with the given id
----

- PUT

Given a JSON with an animal data, updates the matching animal

- DELETE

Deletes the matching animal
