# take-home-exercise
Take home exercise as a backend developer using graphQL (w/ Typescript)

## (A WORK IN PROGRESS)

### Set Up
Create a `.env` file in the root folder and input the port you want to listen to
```
PORT=3001;  // you can replace "3001" with your preferred port
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