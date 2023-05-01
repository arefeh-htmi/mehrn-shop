# Mehrn-shop-admin-panel
<h2>Features</h2>
1. Customers can browse the store categories, products and brands
2. Sellers/Merchants can manage their own brand component
3. Admin(s) can manage and control the entire store components 

<h2>Pictures</h2>

![pic-1](pic-1.png)
![pic](pic.png)


<h2>Folder structure and architucture | backend </h2>

Layered architecture with 3 tiers.
Used SOLID principles and thhe priniciple of sepration of concerns to have lower coupling and higher cohesion 
Middle pattern is used for validation and auth
Used a PUB/Sub layer to facilitate calls to 3rd partyy services 



src
│   
| server.js        
└───api                
└───config             
└───loaders            
└───models             
└───services           
└───subscribers        
└───decorators    
└───interfaces     
└───tasks  
└───types


<h2>Folder structure and architucture | frontend </h2>
public <br/>
src
│   <br/>        
└───actions <br/>
└───components <br/>
└───constants <br/>
└───reducers <br/>
└───screens <br/>
└───styles <br/>
└───utils <br/>
└─app.js <br/>
└─store.js <br/>
└─index.css <br/>


## Steps to install and run 
After cloning make a .env file in the root directory and add 
NODE_ENV, BASE_SERVER_URL, BASE_API_URL, BASE_CLIENT_URL, PORT, DATABASE_URI,
JWT_SECRET, JWT_TOKENLIFE,
PAYPAL_CLIENT_ID, MAILCHIMP_KEY, MAILCHIMP_LIST_KEY,
MAILGUN_KEY, MAILGUN_DOMAIN, MAILGUN_EMAIL_SENDER,
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL,
FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_CALLBACK_URL,

- To install server
"cd backend && npm run install:server"
- To run
"npm  run start:server"

-To install frontend 
"cd frontend && npm install"

-To run 
"npm start"

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

Resources to make this:
https://12factor.net
https://www.npmjs.com/package/microframework-w3tec
