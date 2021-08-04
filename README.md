This is ment to demoonstrate how to use Express JS routing and Mariadb


###REQUIREMENTS

- Nodejs 10.14+
- Mariadb 10+ 
- npm

###INSTALL


####Mariadb
- install Mariadb for your system. Take note what is the root password
- create database called 'testi'.  Log to database console and do command `CREATE DATABASE test;`
- Go to database you created  `USE test;`
- Create table 'test' to database  `CREATE TABLE test( name   varchar(50) null,  number int null);`

####Tools
- install nvm. Nvm handles different versions.
- install npm to handle nodejs packagaes
- go to root of the project in console and do `npm install`. 
  This will install all required packages
- do on terminal `nvm install 10.14` to get nodejs version 10.14

####Configuration 

Find out below code snippet. Change the information to correspond the Mariadb you have setup

`.createConnection({ //set database connection
host: 'localhost',
user: 'test',
password: 'test',
database: 'test',`

###USAGE

To start do `npm start`. If everything is ok it should listen to port 3000 on your localhost

Note that nodemon is in use. So when changing src/index.ts, server will automatically restart

To browse to it base url should  be [http://localhost:3000](http://localhost:3000)

There are three examples to demonstrate how to give parameters, how to get JSON and how to fetch from database

Simple GET call with id shown back should be this. Should give back 23
[http://localhost:3000/api/work_site?id=23](http://localhost:3000/api/work_site?id=23)

Simple GET call giving back data in JSON format
[http://localhost:3000/api/work_site/json](http://localhost:3000/api/work_site/json)

GET call fetching data from dabase and showing it in JSON format
[http://localhost:3000/api/work_site/database](http://localhost:3000/api/work_site/database)
