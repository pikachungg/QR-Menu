const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://pikachungg:Fufupapachon23@cluster0.y72ni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
});
const QRCode = require('qrcode');
const uuid = require('uuid');
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/signup", (req, res) => {
	const { email: emailDB, password: passwordDB, restaurantName: restaurantNameDB } = req.body;
	const restaurant = {
		_id: uuid.v4(),
		name: restaurantNameDB,
		email: emailDB, 
		password: passwordDB,
	};
	console.log(restaurant);
	const generateQR = async (text) => {
		try{
			await QRCode.toFile('./QRCodes/' + restaurant._id + ".png", text);
		}catch (err){
			console.log(err);
		}
	};
	client.connect(async (err) => {
		const collection = client.db("qr-menu").collection("Restaurants");
		const existEmail = await collection.findOne({email: emailDB});
		if (existEmail != null){
			res.sendStatus(400);
			console.log("Email already exists.");
		}
		else {
			await collection.insertOne(restaurant);
			generateQR("http://localhost:3000/" + restaurantNameDB + "/menu");
			res.sendStatus(200);
			console.log(`Created account for ${restaurantNameDB}`);
			return;
		} 
		if (err) throw err;
	});
});

app.post("/signin" , (req, res) => {
	const {email: emailDB, password: passwordDB} = req.body;
	client.connect(async (err) => {
		if (err) throw err;
		const collection = client.db("qr-menu").collection("Restaurants");
		const user = await collection.findOne({email: emailDB, password: passwordDB});
		if (user != null){
			res.sendStatus(200);
			console.log("User found!");
			return;
		}
		else {
			res.sendStatus(404);
			console.log("User not found!")
			return;
		}
	});
});

app.get("/getInformation?:email" ,(req, res) => {
	const email = req.query.email;
	client.connect(async (err) => {
		if (err) throw err;
		const collection = client.db("qr-menu").collection("Restaurants");
		const user = await collection.findOne({email: email});
		const information = {
			_id: user._id,
			name: user.name,
		}
		res.json(information);
	});
});

app.listen(port, () => {
    console.log(`QR-menu backend`);
});
