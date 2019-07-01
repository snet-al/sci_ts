# routing-controllers with express demo

1) Install all dependencies:

   #####`yarn`    | |    `npm install`
    
2) I. Run the project without authentication requirements:

        yarn start      OR     npm run start
    
    II. Run the project with authentication requirements:

        `yarn start:auth`  or  `npm run start:auth`

3) Open in browser:
    
   
         PORT: 3000    (No Authentication Required)
    
         PORT: 3100    (Authentication Required)
 
                    http://localhost:PORT/

### Using with older versions of node

This project targets ES6. 
You can target ES5, but you'll need to use es6-shim and install its typings.


__________________________________________________________________________

# Ussage: 


##### Method: GET
```json5

  http://localhost:3010/ 
        returns "HELLO WORLD"

```
##### Method: GET
```json

  http://localhost:3010/info-project/:id
        returns details for the projiect with the given id
    
   ``` 
   
   ##### Method: POST
   ```json5

      http://localhost:3010/deploy
            takes as parameters:
             {
                "UID": 123,               
                "projectId": 1,           
                "firstName":"filan",     
                "lastName": "fisteku"        
             }
    
    
    *        UID         : User ID 
    *        projectId   : ID of the project you want to deploy
    *        firstName   : User First Name
    *        secondName  : User Second Name

```
##### Method: DELETE
```json5

     http://localhost:3010/delete-project/:id
              Deletes details for the project with the given ID
             

```


`BlankTM`