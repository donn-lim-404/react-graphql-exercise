# take-home-exercise
Take home exercise as a backend developer using graphQL (w/ Typescript)

## (A WORK IN PROGRESS)

### Set Up
Create a `.env` file in the root directory and input the necessary environment settings
```
# Later can be replaced with "production" for public deployment
NODE_ENV = development

# Setting this to "true" will perform a database connection test and auto create a user into the database
TEST_DATABASE = false

# You can replace "3001" with your preferred port
PORT = 3001  
```

Install the necessary modules to run the system
```
npm install
```

### For development

1. To run the system in development mode:
```
npm start
```
You can also use `npm run watch` to auto reload the app when you edit any typescript file within the `src` folder.

This will also create an SQLite database (`database.sqlite`) in the root directory, which will serve as the database for the system.

2. The console should display something similar when the system is up:
```
"Running a Graph API server at http://localhost:3002/graphql"
```

To test that the system is working properly, you can try to access this url in any browser
```
http://localhost:3002/graphql?query={greet}
```

The page should return a response:
```
{
    data:
        greet: "Hello world!" 
}
```

### For deployment

To build the system and compile the code:
```
npm build
```
By default the compiled output is located in the root directory under the folder `dist`.

To run the compiled output (could be for production) use the command:
```
npm serve
```
