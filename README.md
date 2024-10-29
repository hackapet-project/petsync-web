**# petsync-web
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
**# Welcome to petsync!

This is the web version of petsync, build with React, Django and Docker. Follow the next steps to build
and run the application.

## Requirements

- Docker 24.0 or higher
-  Make *(If you don't want to install it, all the necessary commands have the alternative with docker)*
- Git

## Run the application

1. Clone the repo
	*ssh*
	`$ git clone git@github.com:hackapet-project/petsync-web.git`

	*https* 
	 `$ git clone https://github.com/hackapet-project/petsync-web.git`

2. Build the project
	Once installed, run:
		`$ make build`
		`$ docker compose build` 

3.  After building
	You can run the containers with:
		 `$ make up`
		 `$ docker compose up (with --no-attach [service-name] you can omit loggin that service)`

	Front
		- http://localhost:5173/
	
	Back
		- http://localhost:8000
		
	Swagger Documentation
		- http://localhost:8000/v1/docs/
	
4. To stop the app run:
		`$ make down`
		`$ docker compose down`

## Things to have in mind
-  Any time there is a git pull, build the app in case there is a new dependecy to avoid problems
- If you install a dependency, either in front or back, build is necesary to install it.
