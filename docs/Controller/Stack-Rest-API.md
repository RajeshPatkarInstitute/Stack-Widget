## STAAS - Rest API   v0.1

| Command | Param1 | Param2  |
| :---:  |  :-: | :-: |
| getAll |  _  |  _  |
| create | id | -  |
| delete | id | - |
| push | id | value |
| pop| id | - |
| serialize| id | - |ap

<br/>

## getAll
This Restful call will bring the list of all the Stacks present in the StackStore.
eg. **localhost:8080/stack-api/getAll**.

## create
This Restful call will create a Stack with the id provided via dynamic URL.
eg. **localhost:8080/stack-api/create/23**. The preceeding URL will **create** a Stack with id 23

## delete
This Restful call will delete the Stack with a given id provided via dynamic URL. 
eg. **localhost:8080/stack-api/delete/23**. 
The preceeding URL will **delete** a Stack with id 23

## push
This Restful call will push value in the Stack with a given id provided via dynamic URL. 
eg. **localhost:8080/stack-api/push/23/10**. 
The preceeding URL will **push** value 10 in the Stack with id 23

## pop
This Restful call will pop the value from Stack with a given id provided via dynamic URL. 
eg. **localhost:8080/stack-api/pop/23**. 
The preceeding URL will **pop** a value from the Stack with id 23

## serialize
This Restful call will read the value from Stack with a given id provided via dynamic URL. 
eg. **localhost:8080/stack-api/serialize/23**. 
The preceeding URL will get content from the Stack with id 23


