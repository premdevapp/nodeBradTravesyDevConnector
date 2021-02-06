npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
mongodb://localhost:27017/?readPreference=primary

> > //connect to mongoDb
> > mongoose
> > .connect(keys.mongoUri, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() => console.log("MongoDb Connected"))
.catch((error) => console.error(error));
