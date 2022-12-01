# car-renting
=======================

  this is a backend server that provides secured API's to any requesting server, particularly the frontend server that it is created for.
the website aims to allow car rental companies to digitalize their activities, and provide their clients a plateform from which they can rent cars.
  
  this backend takes in consideration security of its users by:
-using bcrypt to hash and salt passwords to protect them from any malware specifically a hack attack.
-authentification using jwt token, to provide safe requests and safe sessions with the server.

 Requirements
============
* NPM >= 6.14.13 (knowing that it can work on relatively lower versions, but this version or higher is definetly enough)
* NODE >= v14.17.3 (knowing that it can work on relatively lower versions, but this version or higher is definetly enough)

Installation
============
  **First step: import the project**</br>
   ***first method using CMD***</br>
whith-in your directory run the following command:
    `git clone https://github.com/AkremGomri/rent-car.git`

enter the directory by running the following command in the same folder:
    `cd rent-car`
   
   ***second method***</br>
directly unzip the directory and then open rent-car directory in the terminal
install node_modules package which is going to take you a short time:

  **second step: install dependencies and run the project**</br>
run the folowing command: 
    `npm install`
    
run the server on localhost port 3000:
    `node server`

if the port is busy, the server will automatically ask you to run on a different port, all you have to do is to accept by typing 'y'.

Usage
=====
sign up as an owner

    send a POST request to: 
        http://localhost:3000/api/owner/signUp 
        
    and provide in the body a json message like this one:
            {
                "userName": "myUserName",
                "motDePasse": "myPassword",
                "nom":"myFamilyName",
                "prenom": "myName",
                "Email": "MyEmail@gmail.com",
                "telephone": 92335648,
                "ville": "Paris",
                "CIN": 098564784,
                "date_de_naissance": "1999-04-12T23:00:00.000Z"
            }
    
    your password will get salted and hashed to get then stored in the database.

sign up as an owner
    send a POST request to: 
        http://localhost:3000/api/owner/signIn
        
     and provide in the body a json message like this one:       
    {
        "motDePasse": "myPassword",
        "Email": "MyEmail@gmail.com"
    }
    
    
    you will be provided by a token, with which you can send any other request by appending the token to the header

