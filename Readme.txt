npm i express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken cloudinary express-fileupload googleapis node-fetch node-mailer
npm i -D nodemon


goto client:
npm i axios react-router-dom redux react-redux

for password_token generation:
https://passwordsgenerator.net/

for auth:
https://console.developers.google.com/projectcreate?previousPage=%2Fprojectselector2%2Fapis%2Fdashboard%3Fpli%3D1%26supportedpurview%3Dproject&supportedpurview=project

make new project
go to credentials
click on create credentials
click OAuth client ID
click configure consent screen
click create
fill App Name and support email and developers email fields only.
keep clicking save and continue on 3 steps

go to credentials
click on create credentials
click OAuth client ID
select Web application type

In Authorized Redirect URIs menu
copy paste https://developers.google.com/oauthplayground

In Authorised JavaScript origins
copy paste http://localhost:3000

Your client ID :
280703812387-bamurhjuvbef6kd4hsk0mdhk0ph40pis.apps.googleusercontent.com

Your Client Secret :
A2q-7rUVKwi9nKfYRKNha8he

You can now see your Web Client 1 in OAuth 2.0 Client ID's Section

Now to goto OAuth consent screen and publish your app before proceeding further

Now goto website
https://developers.google.com/oauthplayground
now click on settings icon
click on use your own OAuth credentials
copy paste client id and Secret and close it

Now type https://mail.google.com
and click on autherize APi

login with your google account 
and you will get verify error and now goto advanced options and click on the option to verify/allow.

Now you will be taken to a new page of Google developers
click on exchange autherization code for tokens button

save the refresh token key and exit both tabs


For google and facebook login
goto client 
visit this website https://www.npmjs.com/package/react-google-login

npm install react-google-login
copypaste the GoogleLogin Component

now visit https://console.developers.google.com/
copy paste your MAILING SERVICE CLIENT ID and paste in the GoogleLogin Component


You gotta goto https://passwordsgenerator.net/
and generate 50 characters long password to generate GOOGLE_SECRET in env


goto facebook developers
Create your APi
Click on build Connected Expriences
Go into your api 
Copy paste Your App id
Click on facebook API icon after scrolling down

click on web option
copy paste http://localhost:3000 in URL section
save it
copy paste your URL in URL section if your app is deployed, you dont need to add localhost:3000 in this URL section as it automatically allows for testing
save it

now goto https://developers.facebook.com/docs/graph-api/overview

and copy paste "https://graph.facebook.com/v2.9/your-facebook-user-id/photos
    ?access_token=your-access-token" into URL constant in userCtrl

