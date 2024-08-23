# Movie Social Media Site

Hello all, thank you for visiting my GitHub, and looking at my Movie Social Media Site. This is a MERN stack application that allows users to create a movie.

However, your cannot just download the files and have the project.

---

First and foremost, none of the required packages were included in this repo, so after downloading the contents, make sure to run `npm install` in both the client and server folder. This will install all the required packages.

However there is one more thing that is missing...

Since I used an API and there is other secret information that shouldn't be shared online, within the server directory, you must create a .env file.

```
PORT= \[ PORT number you want to use for the backend API \]
MONGO_URI= \[ MongoDB cluster connection string \]
SECRET= \[ SECRET for security on JWT, just make it a random string of letters  \]
OMDB_API_KEY= \[ This is the API key that you need to get from OMDB in order to get movie information \]
```

Now that the .env file has been created we must go to the client's package.json, to reference the port number we just defined for the API within the .env file.

---



After you set up the .env file, all you need to do is run 

`npm run dev`

in the server directory, and wait until it connects to the database, then run

`npm run start`

in the client directory, and once its done, it will tell you the url that the application is deployed at.