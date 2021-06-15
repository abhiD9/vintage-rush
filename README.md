## Hi there, Welcome to the Vintage-rush app [Live-Demo].⚡

### Stack used: MongoDb, ExpressJs, NodeJs, ReactJs

### Services: Google-Maps, Google-login, Mailgun, Paypal, SocketIo, JWT

### Features and Description :
This is an E-commerce website with different user roles such as admin, seller, users(customers). 
It has features like -
* Maps which allow users to quickly fill the address by just moving a marker. 
* Users Recieve Order receipts via emails. 
* Multivendor functionality - Sellers can manage their own orders like delivery status

#### User Roles:
* Can browse through items
* In case they want add products to cart or purchase an item they need to be logged in or signed up.
* Users can login/signup with their google account or emails
* Users can have a chat with the admin
* Pay orders via Paypal, this is a development build hence uses a sandbox account (so make sure you test it via your sandbox account too) hence will be accepting from sandbox accounts only.
* See their order status and much more

#### Admin Roles:
* Can control almost everything like:
* Make a user seller or admin and take them down to normal user
* Remove any user
* Have access to vendors orders; can delete them or mark their status as delivered too
* Can answer customers queries
* Admin Dashboard displays user count, total profit, total orders in well formatted charts

### Home Page
Home Page display's list of Top sellers  (top 3 sellers dynamic)

### Products Page 
Click the search button to have a look at this

Products - Search Page Displays list of products which can be :

 - Quickly Searched
 - Filtered by category name price ratings etc.
 - Sorted By Arrival, Price range, customer reviews
 - Rated by Authenticated users only
 - Reviewed and can have comments Authenticated users only

#### Seller Roles:
* Create, edit, update or delete orders
* Can Modify the status of the order to delivered

## Run the project Locally:
After cloning repository 
Install the dependencies
1. cd frontend - yarn install (why not npm install ? simply because this project is using yarn lock)
2. cd backend - npm i 
3. create .env file in backend at root level (copy from .env.example file provided in the project)
   change the values of respected fields with your credentials
   accesskey and the secret access keys are referring to aws (check this guide on how to get those https://www.youtube.com/watch?v=5oBHvl1hurE)
4. now run both frontend and backend by cd into those and npm start command
5. Lets create some users(including admin) and some dummy products
   simply hit these two urls to seed some data into database
   * http://localhost:5000/api/products/seed
   * http://localhost:5000/api/users/seed
6. All set. Your project must be already opened in the browser (if not simply hit http://localhost:3000)

### Project Flow
You can now login as admin (you can change the password after logging in) : 
email: admin@gmail.com,
password: 123

and also create some other users, make them sellers or admin,  add products to cart, checkout etc.
 
[Live-Demo]: https://vintage-rush-live-qsufc.ondigitalocean.app/
