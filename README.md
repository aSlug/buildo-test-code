# buildo-test-code

Configuration service made easy

### How to run it
You will need **node.js** and **typescript** to run the server. Once you got them and you installed the dependencies, you can run the server with
```
npm run start
```
### How to use it

Once you ran the server you can visit `http://localhost:3000/api-docs/` to see the documentation.

## Contribution guidelines

The whole service is written in **typescript**, running on **node.js** and built on top of **express.js**.

When developing new features please follow the existing project structure: only the functions on the `state` folder's modules should be allowed to access the state of the application, while all the routing logic should be inside the `route` folder.

**Mocha** and **supertest** have been used to create unit tests that you can run with 
```
npm run test
```
to text the fundamentals functionalities of the application.

**OpenAPI SwaggerUI** has been used to generate a nice and interactive documentation of the API, so be sure to update the `swagger.json` according with any changes.



