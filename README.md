NodeJS-Mysql Technical Evaluation Round for Lattice Innovations          
To run the api type "npm start" in the terminal which you are in the same directory as index.js
## Libraries Used
1) express
2) sqlite3

## API Details
Postman link (https://www.getpostman.com/collections/1377e58740c356089c64)
1)Post request to register patients ('/register-patient')

2)Get request to get all the patients of a psychiatrist ('/psychiatristName/patients')
  here in place of psychiatristName you can write the name of the psychiatrist and get object of all the patients with their name, address,email,phone,hospital
  
3) Get request to get the number of patients of each psychiatrist ('/:psychiatrist/count')
  here in place of psychiatristName you can write the name of the psychiatrist and get the count of his patients
  One thing I was not able to figure out was how to return hospital name and psychiatrist with count
  
 As this is a nodejs api this can be uploaded via heroku.
 50 entries of dummy data will try and add them by tomorrow.
 Sorry for the delay
