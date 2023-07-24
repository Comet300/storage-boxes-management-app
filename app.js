require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

//ORM Mapping for MongoDb
const mongoose = require("mongoose");

//Storage engine
const multer = require("multer");

//File storage
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

//seeding
const seed1 = require("./models/seedBox1.js");
const seed2 = require("./models/seedBox2.js");
const seed3 = require("./models/seedBox3.js");
const seed4 = require("./models/seedBox4.js");
const seed5 = require("./models/seedBox5.js");
const seed6 = require("./models/seedBox6.js");
const seed7 = require("./models/seedBox7.js");
const seed8 = require("./models/seedBox8.js");
const seed10 = require("./models/seedBox10.js");

const deploy = require("./models/deployer");

//Evidence entities
const Evidenta1 = require("./models/evidenta1.js");
const Evidenta2 = require("./models/evidenta2.js");
const Evidenta3 = require("./models/evidenta3.js");
const Evidenta4 = require("./models/evidenta4.js");
const Evidenta5 = require("./models/evidenta5.js");
const Evidenta6 = require("./models/evidenta6.js");
const Evidenta7 = require("./models/evidenta7.js");
const Evidenta8 = require("./models/evidenta8.js");
const Evidenta10 = require("./models/evidenta10.js");

//Box entities
const Box1 = require("./models/box1.js");
const Box2 = require("./models/box2.js");
const Box3 = require("./models/box3.js");
const Box4 = require("./models/box4.js");
const Box5 = require("./models/box5.js");
const Box6 = require("./models/box6.js");
const Box7 = require("./models/box7.js");
const Box8 = require("./models/box8.js");
const Box10 = require("./models/box10.js");

//History entities
const his1 = require("./models/his1.js");
const his2 = require("./models/his2.js");
const his3 = require("./models/his3.js");
const his4 = require("./models/his4.js");
const his5 = require("./models/his5.js");
const his6 = require("./models/his6.js");
const his7 = require("./models/his7.js");
const his8 = require("./models/his8.js");
const his10 = require("./models/his10.js");

//helpers
const Payments = require("./models/payments.js");
const dateUtils = require("./public/scripts/date-utils-min.js");

const http = require("http");
const https = require("https");

//Auth
const passport = require("passport");
const localStrategy = require("passport-local");

//Entitate user
const User = require("./models/user");

//Auth utils
const isLoggedIn = require("./etc/isLoggedIn");
const isVerified = require("./etc/isVerified");

//Email helper
const { sendEmail } = require("./etc/sendMail");

//User token
const Token = require("./models/token");
const session = require("cookie-session");

const expressSanitizer = require("express-sanitizer");

//Await all
const q = require("q");

//other utils
const flash = require("express-flash-messages");
const compareByBoxName = require("./etc/sortByBoxName");

https.globalAgent.maxSockets = Infinity;
http.globalAgent.maxSockets = Infinity;

const app = express();

app.set("env", "production");
app.use(expressSanitizer());
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//Cache control
//comment maxAge to disable caching
app.use(
	express.static(__dirname + "/public", {
		maxAge: 31557600,
	})
);

//flash messages
app.use(flash());

//Force HTTPS (disable when no SSL cert is available)

app.use(function (req, res, next) {
	if (req.secure) {
		// Cerere https -> nu facem nimic
		next();
	} else {
		// Cerere http -> redirect la https
		res.redirect("https://" + req.headers.host + req.url);
	}
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

let conn;
try {
	conn = mongoose.createConnection(process.env.MONGO_LOCAL_CONN_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	mongoose.connect(process.env.MONGO_LOCAL_CONN_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (err) {
	throw "Baza de date nu poate fi accesata";
}

let gfs;

conn.once("open", () => {
	// Init stream
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("contracts");
});

// Create storage engine
const storage = new GridFsStorage({
	url: process.env.MONGO_LOCAL_CONN_URL,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			const filename = file.originalname;
			const fileInfo = {
				filename: filename,
				bucketName: "contracts",
			};
			resolve(fileInfo);
		});
	},
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
});

const upload = multer({
	storage,
});

// seed1(); //seed for "hala 1"
// seed2(); //seed for "hala 2"
// seed3(); //seed for "hala 3"
// seed4(); //seed for "hala 4"
// seed5(); //seed for "hala 5"
// seed6(); //seed for "hala 6"
// seed7(); //seed for "hala 7"
// seed8(); //seed for "hala 8"
// seed10(); //seed for "hala 10"
// deploy(); //deploy new hall with default payments
//PASSPORT SETUP

const expiryDate = new Date(Date.now() + 60 * 120 * 1000); // The user session expires in 2 hours
app.use(
	session({
		name: "session",
		keys: ["key1", "key2"],
		cookie: {
			secure: true,
			httpOnly: false,
			domain: "https://gestiune.boxe-depozitare.ro",
			expires: expiryDate,
		},
	})
);

app.set("trust proxy", 1);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//AUTH ROUTES

//REGISTER
app.get("/register", (req, res) => {
	res.status(200);
	res.render("register");
});

app.post("/register", (req, res) => {
	if (req.body.username == "" || req.body.email == "" || req.body.password == "") return;
	User.register(
		new User({
			username: req.sanitize(req.body.username),
			email: req.sanitize(req.body.email),
		}),
		req.sanitize(req.body.password),
		async (err, user) => {
			if (err) {
				if (err.keyPattern) return res.redirect("/register?err=emailExists");
				return res.redirect("/register?err=userExists");
			}

			const token1 = user.generateVerificationToken();
			await token1.save();

			let subject = "Account Verification Token";
			let to = process.env.ADMIN_EMAIL;
			let from = process.env.FROM_EMAIL;
			let link = "http://" + req.headers.host + "/register/verify/" + token1.token;
			let html = `<p><p>Salut</p> Utilizatorul ${user.email} doreste sa creeze un cont pe platforma de gestiune <p><p>Apasa pe urmatorul <a href="${link}">link</a> pentru a permite accesul sau</p> 
                  <p>Daca nu doresti acest lucru, ignora acest email</p>`;

			await sendEmail({
				to,
				from,
				subject,
				html,
			});

			res.redirect("/login?msg=verify");
		}
	);
});

//Confirm account
app.get("/register/verify/:token", async (req, res) => {
	if (!req.params.token)
		return res.status(400).json({
			message: "We were unable to find a user for this token.",
		});

	try {
		// Find a matching token
		const token = await Token.findOne({
			token: req.params.token,
		});

		if (!token)
			return res.status(400).json({
				message: "We were unable to find a valid token. Your token my have expired.",
			});

		// If we found a token, find a matching user
		User.findOne(
			{
				_id: token.userId,
			},
			(err, user) => {
				if (!user)
					return res.status(400).json({
						message: "We were unable to find a user for this token.",
					});

				if (user.isVerified)
					return res.status(400).json({
						message: "This user has already been verified.",
					});

				// Verify and save the user
				user.isVerified = true;
				user.save(function (err) {
					if (err)
						return res.status(500).json({
							message: err.message,
						});

					res.status(200).send("The account has been verified. Please log in.");
				});
			}
		);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

//LOGIN
app.get("/login", (req, res) => {
	res.status(200);
	res.render("login");
});

app.post(
	"/login",
	isVerified,
	passport.authenticate("local", {
		successRedirect: "/",
		successMessage: "success",
		failureRedirect: "/login?err=auth",
	}),
	(req, res) => {}
);

app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/login");
});

//FORGOT PASSWORD
app.get("/login/recover", (req, res) => {
	res.status(200);
	res.render("recover");
});

app.post("/login/recover", async (req, res) => {
	const { email } = req.body;

	await User.findOne({
		email,
	})
		.then(async (user) => {
			user.generatePasswordReset();
			await user.save();

			let subject = "Cerere de schimbare a parolei";
			let to = user.email;
			let from = process.env.FROM_EMAIL;
			let link = "http://" + req.headers.host + "/login/recover/" + user.resetPasswordToken;
			let html = `<p>Salut ${user.username}</p>
                <p>Apasa pe urmatorul <a href="${link}">link</a> pentru a-ti reseta parola.</p> 
                <p>Daca nu ai cerut acest lucru, ignora acest email iar parola va ramane neschimbata.</p>`;

			await sendEmail({
				to,
				from,
				subject,
				html,
			});
			res.status(200);
			res.redirect("/login?msg=verify");
		})
		.catch((err) => {
			res.status(500).json({
				message: error.message,
			});
		});
});

app.get("/login/recover/:token", async (req, res) => {
	const { token } = req.params;

	const user = await User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: {
			$gt: Date.now(),
		},
	});

	if (!user)
		return res.status(401).json({
			message: "Password reset token is invalid or has expired.",
		});

	//Redirect user to form with the email address
	res.status(200);
	res.render("reset", {
		user,
	});
});

app.post("/login/recover/:token", async (req, res) => {
	const { token } = req.params;

	await User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: {
			$gt: Date.now(),
		},
	}).then(async (user) => {
		if (!user)
			return res.status(401).json({
				message: "Password reset token is invalid or has expired.",
			});

		//Set the new password
		await user.setPassword(req.sanitize(req.body.newPassword));
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		//user.isVerified = true;
		await user.save();

		let subject = "Parola ta a fost schimbata";
		let to = user.email;
		let from = process.env.FROM_EMAIL;
		let html = `<p>Buna ${user.username}</p>
                    <p>Parola pentru contul ${user.email} a fost schimbata cu success.</p>`;

		await sendEmail({
			to,
			from,
			subject,
			html,
		});

		res.status(200).redirect("/login?msg=passSuccess");
	});
});

//FILE ROUTES
app.get("/contracts/", isLoggedIn, (req, res) => {
	res.status(404);
	res.render("contract404");
});

app.post("/hala1/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box1.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta1.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his1
					.create({
						box: req.params.boxName,
						nume: data.nume,
						telefon: data.telefon,
						email: data.email,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala1/view/" + req.params.boxName);
					});
			} else {
				await his1
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala1/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala2/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box2.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta2.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his2
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala2/view/" + req.params.boxName);
					});
			} else {
				await his2
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala2/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala3/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box3.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta3.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his3
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala3/view/" + req.params.boxName);
					});
			} else {
				await his3
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala3/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala4/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box4.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta4.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his4
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala4/view/" + req.params.boxName);
					});
			} else {
				await his4
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala4/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala5/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box5.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta5.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his5
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala5/view/" + req.params.boxName);
					});
			} else {
				await his5
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala5/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala6/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box6.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta6.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his6
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala6/view/" + req.params.boxName);
					});
			} else {
				await his6
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala6/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala7/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box7.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta7.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his7
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala7/view/" + req.params.boxName);
					});
			} else {
				await his7
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala7/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala8/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box8.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta8.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his8
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala8/view/" + req.params.boxName);
					});
			} else {
				await his8
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala8/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala10/upload/:boxName", isLoggedIn, upload.single("file"), async (req, res) => {
	let data = JSON.parse(JSON.stringify(req.body));
	await Box10.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.contract != "") {
				first = false;
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							return res.send(err);
						}
					}
				);
			}

			box.nume = data.nume;
			box.telefon = data.telefon;
			box.email = data.email;
			box.contract = req.file.id;
			box.save();
			await Evidenta10.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (first) {
				await his10
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala10/view/" + req.params.boxName);
					});
			} else {
				await his10
					.create({
						box: req.params.boxName,
						nume: data.nume,
						email: data.email,
						telefon: data.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala10/view/" + req.params.boxName);
					});
			}
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/contracts/:filename", isLoggedIn, async (req, res) => {
	await gfs.files
		.findOne({
			_id: new mongoose.mongo.ObjectID(req.params.filename),
		})
		.then((file) => {
			// Check if file
			if (!file || file.length === 0) {
				res.status(404);
				return res.render("contract404");
			}
			// If File exists this will get executed
			const readstream = gfs.createReadStream({ _id: file._id, filename: file.filename, contentType: file.contentType, mode: "w" });
			res.set("Content-Type", file.contentType);
			res.setHeader("Content-Disposition", 'inline;filename="' + file.filename + '"');

			return readstream.pipe(res).on("end", function () {
				console.log(res._headers);
			});
		});
});

// delete function to remove the file from the database
app.delete("/contracts/:filename", isLoggedIn, async (req, res) => {
	gfs.remove(
		{
			_id: new mongoose.mongo.ObjectID(req.params.filename),
			root: "contracts",
		},
		(err, GridFsBucket) => {
			if (err) {
				res.status(404);
				return res.render("contract404");
			}
		}
	);
});

//root file
app.get("/", isLoggedIn, async (req, res) => {
	let promises = [
		Box1.find({}).lean().exec(),
		Box2.find({}).lean().exec(),
		Box3.find({}).lean().exec(),
		Box4.find({}).lean().exec(),
		Box5.find({}).lean().exec(),
		Box6.find({}).lean().exec(),
		Box7.find({}).lean().exec(),
		Box8.find({}).lean().exec(),
		Box10.find({}).lean().exec(),
	];

	q.all(promises).then((results) => {
		let boxes1 = results[0];
		let boxes2 = results[1];
		let boxes3 = results[2];
		let boxes4 = results[3];
		let boxes5 = results[4];
		let boxes6 = results[5];
		let boxes7 = results[6];
		let boxes8 = results[7];
		let boxes10 = results[8];
		res.status(200);
		res.render("index", {
			boxes1,
			boxes2,
			boxes3,
			boxes4,
			boxes5,
			boxes6,
			boxes7,
			boxes8,
			boxes10,
		});
	});
});

//============================================
//=================HALA 1=====================
//============================================

app.get("/hala1", isLoggedIn, async (req, res) => {
	await Evidenta1.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala1", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala1/view/:boxName", isLoggedIn, async (req, res) => {
	await Box1.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta1.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];
				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala1",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala1/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box1.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala1/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala1/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala1/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala1: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala1.suma = obj.hala1.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala1/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala1/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala1/view/" + req.params.boxName);
	}

	await Box1.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala1/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala1/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box1.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta1.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his1
					.create({
						box: req.params.boxName,
						nume: box.nume,
						telefon: box.telefon,
						email: box.email,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala1/view/" + req.params.boxName);
					});
			else
				await his1
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala1/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala1/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala10") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta1.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box1.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala1/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala1/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his1.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h2".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}.toUpperCase()`,
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala1/view/" + sourceBox);
	});
});

app.post("/hala1/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;

	await Box1.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);

			if (box.nume == "") writeHis = false;

			if (writeHis) {
				let date = new Date();
				await his1.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}

			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";

			box.save();

			await Evidenta1.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});

			req.flash("success", "Boxa eliberata");
			res.redirect("/hala1/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 2=====================
//============================================

app.get("/hala2", isLoggedIn, async (req, res) => {
	await Evidenta2.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala2", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala2/view/:boxName", isLoggedIn, async (req, res) => {
	await Box2.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta2.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];
				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala2",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala2/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box2.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala2/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala2/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala1/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala2: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala2.suma = obj.hala2.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala2/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala2/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala2/view/" + req.params.boxName);
	}

	await Box2.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala2/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala2/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box2.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta2.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his2
					.create({
						box: req.params.boxName,
						nume: box.nume,
						telefon: box.telefon,
						email: box.email,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala2/view/" + req.params.boxName);
					});
			else
				await his2
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala2/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala2/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala10") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta2.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box2.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala2/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala2/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his2.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h2".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}.toUpperCase()`,
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala2/view/" + sourceBox);
	});
});

app.post("/hala2/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;

	await Box2.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);

			if (box.nume == "") writeHis = false;

			if (writeHis) {
				let date = new Date();
				await his2.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}

			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";

			box.save();

			await Evidenta2.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});

			req.flash("success", "Boxa eliberata");
			res.redirect("/hala2/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 3=====================
//============================================

app.get("/hala3", isLoggedIn, async (req, res) => {
	await Evidenta3.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala3", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala3/view/:boxName", isLoggedIn, async (req, res) => {
	await Box3.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);
			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta3.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];
				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala3",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala3/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box3.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala3/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala3/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala1/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala3: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala3.suma = obj.hala3.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala3/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala3/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala3/view/" + req.params.boxName);
	}

	await Box3.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala3/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala3/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box3.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta3.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his3
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala3/view/" + req.params.boxName);
					});
			else
				await his3
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala3/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala3/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	}

	let promises = [
		Evidenta3.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box3.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala3/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala3/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his3.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h3".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}.toUpperCase()`,
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala2/view/" + sourceBox);
	});
});

app.post("/hala3/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;

	await Box3.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);

			if (box.nume == "") writeHis = false;

			if (writeHis) {
				let date = new Date();
				await his3.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}
			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";

			box.save();

			await Evidenta3.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});

			req.flash("success", "Boxa eliberata");
			res.redirect("/hala3/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 4=====================
//============================================

app.get("/hala4", isLoggedIn, async (req, res) => {
	await Evidenta4.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala4", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala4/view/:boxName", isLoggedIn, async (req, res) => {
	await Box4.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta4.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];
				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala4",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala4/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box4.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala4/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala4/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala1/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala4: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala4.suma = obj.hala4.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala4/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala4/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala4/view/" + req.params.boxName);
	}

	await Box4.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala4/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala4/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box4.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta4.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his4
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala4/view/" + req.params.boxName);
					});
			else
				await his4
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala4/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala4/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta4.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box4.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala4/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala4/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his4.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h4".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}.toUpperCase()`,
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala4/view/" + sourceBox);
	});
});

app.post("/hala4/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;

	await Box4.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);

			if (box.nume == "") writeHis = false;

			if (writeHis) {
				let date = new Date();
				await his4.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}

			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";

			box.save();

			await Evidenta4.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});

			req.flash("success", "Boxa eliberata");
			res.redirect("/hala4/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 5=====================
//============================================

app.get("/hala5", isLoggedIn, async (req, res) => {
	await Evidenta5.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala5", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala5/view/:boxName", isLoggedIn, async (req, res) => {
	await Box5.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta5.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];
				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala5",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala5/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box5.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala5/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala5/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala1/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala5: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala5.suma = obj.hala5.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala5/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala5/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala5/view/" + req.params.boxName);
	}

	await Box5.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala5/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala5/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box5.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta5.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his5
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala5/view/" + req.params.boxName);
					});
			else
				await his5
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala5/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala5/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala10") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta5.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box5.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala5/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala5/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his5.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h5".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}`.toUpperCase(),
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala5/view/" + sourceBox);
	});
});

app.post("/hala5/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;

	await Box5.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);

			if (box.nume == "") writeHis = false;

			if (writeHis) {
				let date = new Date();
				await his5.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}

			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";

			box.save();

			await Evidenta5.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});

			req.flash("success", "Boxa eliberata");
			res.redirect("/hala5/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 6=====================
//============================================

app.get("/hala6", isLoggedIn, async (req, res) => {
	await Evidenta6.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala6", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala6/view/:boxName", isLoggedIn, async (req, res) => {
	await Box6.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta6.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];
				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala6",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala6/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box6.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala6/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala6/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala6/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala6: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala6.suma = obj.hala6.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala6/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala6/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala6/view/" + req.params.boxName);
	}

	await Box6.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala6/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala6/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box6.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta6.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his6
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala6/view/" + req.params.boxName);
					});
			else
				await his6
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala6/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala6/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala10") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta6.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box6.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala6/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala6/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his6.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h6".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}`.toUpperCase(),
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala6/view/" + sourceBox);
	});
});

app.post("/hala6/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;
	await Box6.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);
			if (box.nume == "") writeHis = false;
			if (writeHis) {
				let date = new Date();
				await his6.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}
			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";
			box.save();
			await Evidenta6.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});
			req.flash("success", "Boxa eliberata");
			res.redirect("/hala6/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 7=====================
//============================================
app.get("/hala7", isLoggedIn, async (req, res) => {
	await Evidenta7.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala7", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala7/view/:boxName", isLoggedIn, async (req, res) => {
	await Box7.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta7.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];
				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala7",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala7/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box7.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala7/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala7/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala7/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala7: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala7.suma = obj.hala7.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala7/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala7/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala7/view/" + req.params.boxName);
	}

	await Box7.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala7/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala7/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box7.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta7.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his7
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala7/view/" + req.params.boxName);
					});
			else
				await his7
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala7/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala7/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala10") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta7.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box7.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala7/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala7/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his7.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h7".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}`.toUpperCase(),
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala7/view/" + sourceBox);
	});
});

app.post("/hala7/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;
	await Box7.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);
			if (box.nume == "") writeHis = false;
			if (writeHis) {
				let date = new Date();
				await his7.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}
			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";
			box.save();
			await Evidenta7.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});
			req.flash("success", "Boxa eliberata");
			res.redirect("/hala7/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 8=====================
//============================================
app.get("/hala8", isLoggedIn, async (req, res) => {
	await Evidenta8.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala8", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala8/view/:boxName", isLoggedIn, async (req, res) => {
	await Box8.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta8.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];

				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala8",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala8/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box8.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala8/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala8/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala8/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala8: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala8.suma = obj.hala8.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala8/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala8/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala8/view/" + req.params.boxName);
	}

	await Box8.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala8/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala8/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box8.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta8.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his8
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala8/view/" + req.params.boxName);
					});
			else
				await his8
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala8/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala8/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala10") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta8.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box8.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala8/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala8/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his8.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h8".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}`.toUpperCase(),
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala8/view/" + sourceBox);
	});
});

app.post("/hala8/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;
	await Box8.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);
			if (box.nume == "") writeHis = false;
			if (writeHis) {
				let date = new Date();
				await his8.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}
			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";
			box.save();
			await Evidenta8.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});
			req.flash("success", "Boxa eliberata");
			res.redirect("/hala8/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//============================================
//=================HALA 10=====================
//============================================
app.get("/hala10", isLoggedIn, async (req, res) => {
	await Evidenta10.find({})
		.lean()
		.then((evidenta) => {
			res.status(200);
			res.render("hale/hala10", {
				evidenta: evidenta,
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.get("/hala10/view/:boxName", isLoggedIn, async (req, res) => {
	await Box10.findOne({
		identificator: req.params.boxName,
	})
		.lean()
		.then(async (boxInfo) => {
			boxInfo.achitari = dateUtils.generateDates(boxInfo.achitari);

			let promises = [
				Evidenta1.find({}).lean().exec(),
				Evidenta2.find({}).lean().exec(),
				Evidenta3.find({}).lean().exec(),
				Evidenta4.find({}).lean().exec(),
				Evidenta5.find({}).lean().exec(),
				Evidenta6.find({}).lean().exec(),
				Evidenta7.find({}).lean().exec(),
				Evidenta8.find({}).lean().exec(),
				Evidenta10.find({}).lean().exec(),
				Evidenta10.findOne({
					identificator: req.params.boxName,
				})
					.lean()
					.exec(),
			];
			q.all(promises).then((results) => {
				let Evidenta1 = results[0];
				let Evidenta2 = results[1];
				let Evidenta3 = results[2];
				let Evidenta4 = results[3];
				let Evidenta5 = results[4];
				let Evidenta6 = results[5];
				let Evidenta7 = results[6];
				let Evidenta8 = results[7];
				let Evidenta10 = results[8];

				res.status(200);
				res.render("menus/view", {
					boxInfo,
					hala: "hala10",
					Evidenta1,
					Evidenta2,
					Evidenta3,
					Evidenta4,
					Evidenta5,
					Evidenta6,
					Evidenta7,
					Evidenta8,
					Evidenta10,
					dimensiune: results[9].dimensiune,
				});
			});
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala10/box/:boxName/pay", isLoggedIn, async (req, res) => {
	await Box10.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.nume == "") {
				req.flash("error", "Nu se poate achita o boxa goala");
				return res.redirect("/hala10/view/" + req.params.boxName);
			}

			for (let i = 0; i < box.achitari.length; i++) {
				if (
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data1)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2)) ||
					dateUtils.inRange(dateUtils.toDate(req.sanitize(req.body.data2)), dateUtils.toDate(box.achitari[i].date1), dateUtils.toDate(box.achitari[i].date2))
				) {
					req.flash("error", "O parte din intervalul selectat este deja achitat");
					return res.redirect("/hala10/view/" + req.params.boxName);
				}
			}

			if (!/\d/.test(req.sanitize(req.body.suma)) || isNaN(req.sanitize(req.body.suma))) {
				req.flash("error", "Suma achitata nu este valida");
				return res.redirect("/hala10/view/" + req.params.boxName);
			}

			let d = new Date();
			box.achitari.push({
				date1: req.sanitize(req.body.data1),
				date2: req.sanitize(req.body.data2),
				suma: req.sanitize(req.body.suma),
				inregistrat: true,
				dataAchitare: `${d.getDate()} ${dateUtils.monthNames[d.getMonth()]} ${d.getFullYear()}`,
			});
			box.save();

			await Payments.findOne({
				luna: dateUtils.getMonth(d),
			}).then(async (obj) => {
				if (!obj) {
					await Payments.create({
						hala10: {
							suma: parseInt(req.sanitize(req.body.suma)),
						},
						luna: dateUtils.getMonth(d),
					});
				} else {
					obj.hala10.suma = obj.hala10.suma + parseInt(req.sanitize(req.body.suma));
					obj.save();
				}
			});

			req.flash("success", "Plata inregistrata");
			res.redirect("/hala10/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala10/box/:boxName/adjust", isLoggedIn, async (req, res) => {
	if (isNaN(req.sanitize(req.body["pret-nou"]))) {
		req.flash("error", "Pretul trebuie sa fie un numar");
		return res.redirect("/hala10/view/" + req.params.boxName);
	}

	await Box10.findOne({
		identificator: req.params.boxName,
	})
		.then((box) => {
			box.pretCurent = req.sanitize(req.body["pret-nou"]);
			box.save();
			res.redirect("/hala10/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

app.post("/hala10/box/:boxName/new", isLoggedIn, async (req, res) => {
	await Box10.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			let first = true;
			if (box.nume == "") first = false;

			box.nume = req.sanitize(req.body.nume);
			box.telefon = req.sanitize(req.body.telefon);
			box.email = req.sanitize(req.body.email);
			box.save();
			await Evidenta10.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = false;
				ev.save();
			});

			let date = new Date();
			if (!first)
				await his10
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "new",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala10/view/" + req.params.boxName);
					});
			else
				await his10
					.create({
						box: req.params.boxName,
						nume: box.nume,
						email: box.email,
						telefon: box.telefon,
						action: "change",
						date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
					})
					.then(() => {
						res.redirect("/hala10/view/" + req.params.boxName);
					});
		})
		.catch((error) => {
			res.json({
				error: error.message,
			});
		});
});

app.post("/hala10/box/:boxName/move", isLoggedIn, async (req, res) => {
	let sourceBox = req.sanitize(req.params.boxName);
	let targetBox = req.sanitize(req.body.boxSelection);
	let targetHall = req.sanitize(req.body.hala);

	let targetBoxItem;
	let targetEvidentaItem;

	if (targetHall == "hala1") {
		targetBoxItem = Box1;
		targetEvidentaItem = Evidenta1;
	} else if (targetHall == "hala2") {
		targetBoxItem = Box2;
		targetEvidentaItem = Evidenta2;
	} else if (targetHall == "hala3") {
		targetBoxItem = Box3;
		targetEvidentaItem = Evidenta3;
	} else if (targetHall == "hala4") {
		targetBoxItem = Box4;
		targetEvidentaItem = Evidenta4;
	} else if (targetHall == "hala5") {
		targetBoxItem = Box5;
		targetEvidentaItem = Evidenta5;
	} else if (targetHall == "hala6") {
		targetBoxItem = Box6;
		targetEvidentaItem = Evidenta6;
	} else if (targetHall == "hala7") {
		targetBoxItem = Box7;
		targetEvidentaItem = Evidenta7;
	} else if (targetHall == "hala8") {
		targetBoxItem = Box8;
		targetEvidentaItem = Evidenta8;
	} else if (targetHall == "hala10") {
		targetBoxItem = Box10;
		targetEvidentaItem = Evidenta10;
	}

	let promises = [
		Evidenta10.findOne({
			identificator: sourceBox,
		}),
		targetEvidentaItem.findOne({
			identificator: targetBox,
		}),
		Box10.findOne({
			identificator: sourceBox,
		}),
		targetBoxItem.findOne({
			identificator: targetBox,
		}),
	];
	q.all(promises).then(async (results) => {
		let evidentaSource = results[0];
		let evidentaTarget = results[1];
		let boxSource = results[2];
		let boxTarget = results[3];

		if (evidentaSource.liber == true) {
			req.flash("error", "Nu se poate muta o boxa goala");
			return res.redirect("/hala10/view/" + req.params.boxName);
			//daca incercma sa mutam o boxa libera
		}
		if (evidentaTarget.liber == false) {
			req.flash("error", "Nu se poate muta peste o boxa ocupata");
			return res.redirect("/hala10/view/" + sourceBox);
			//daca incercam sa mutam peste o boxa ocupata
		}

		boxTarget.nume = boxSource.nume;
		boxTarget.telefon = boxSource.telefon;
		boxTarget.email = boxSource.email;
		boxTarget.pretCurent = boxSource.pretCurent;
		boxTarget.achitari = boxSource.achitari;
		boxTarget.contract = boxSource.contract;
		boxTarget.save();

		evidentaTarget.liber = false;
		evidentaTarget.save();

		let date = new Date();
		await his10.create({
			box: boxSource.identificator,
			nume: boxSource.nume,
			telefon: boxSource.telefon,
			email: boxSource.email,
			action: "move",
			date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
			newBox: boxTarget.identificator,
			halaCurenta: "h10".toUpperCase(),
			halaTinta: `${targetHall[0]}${targetHall[targetHall.length - 1]}`.toUpperCase(),
		});

		boxSource.nume = "";
		boxSource.telefon = "";
		boxSource.email = "";
		boxSource.pretCurent = "1000";
		boxSource.achitari = [];
		boxSource.contract = "";
		boxSource.save();

		evidentaSource.liber = true;
		evidentaSource.save();

		req.flash("success", "Boxa a fost mutata");
		return res.redirect("/hala10/view/" + sourceBox);
	});
});

app.post("/hala10/box/:boxName/remove", isLoggedIn, async (req, res) => {
	let writeHis = true;
	await Box10.findOne({
		identificator: req.params.boxName,
	})
		.then(async (box) => {
			if (box.contract)
				gfs.remove(
					{
						_id: new mongoose.mongo.ObjectID(box.contract),
						root: "contracts",
					},
					(err, GridFsBucket) => {
						if (err) {
							res.send("Contractul nu a putut fi sters");
						}
					}
				);
			if (box.nume == "") writeHis = false;
			if (writeHis) {
				let date = new Date();
				await his10.create({
					box: req.params.boxName,
					nume: box.nume,
					email: box.email,
					telefon: box.telefon,
					action: "remove",
					date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				});
			}
			box.nume = "";
			box.telefon = "";
			box.email = "";
			box.pretCurent = "1000";
			box.achitari = [];
			box.contract = "";
			box.save();
			await Evidenta10.findOne({
				identificator: req.params.boxName,
			}).then((ev) => {
				ev.liber = true;
				ev.save();
			});
			req.flash("success", "Boxa eliberata");
			res.redirect("/hala10/view/" + req.params.boxName);
		})
		.catch((error) =>
			res.json({
				error: error.message,
			})
		);
});

//===================================================================
//===================================================================
//===================================================================

app.get("/statistici", isLoggedIn, async (req, res) => {
	let promises = [
		Evidenta1.find({}).lean().exec(),
		Evidenta2.find({}).lean().exec(),
		Evidenta3.find({}).lean().exec(),
		Evidenta4.find({}).lean().exec(),
		Evidenta5.find({}).lean().exec(),
		Evidenta6.find({}).lean().exec(),
		Evidenta7.find({}).lean().exec(),
		Evidenta8.find({}).lean().exec(),
		Evidenta10.find({}).lean().exec(),
		Payments.find({}).lean().exec(),
		his1.find({}).lean().exec(),
		his2.find({}).lean().exec(),
		his3.find({}).lean().exec(),
		his4.find({}).lean().exec(),
		his5.find({}).lean().exec(),
		his6.find({}).lean().exec(),
		his7.find({}).lean().exec(),
		his8.find({}).lean().exec(),
		his10.find({}).lean().exec(),
	];

	q.all(promises).then((results) => {
		let rez = [];
		let evidenta = [
			results[0].sort(compareByBoxName),
			results[1].sort(compareByBoxName),
			results[2].sort(compareByBoxName),
			results[3].sort(compareByBoxName),
			results[4].sort(compareByBoxName),
			results[5].sort(compareByBoxName),
			results[6].sort(compareByBoxName),
			results[7].sort(compareByBoxName),
			results[8].sort(compareByBoxName),
		];

		for (let i = 0; i <= 8; i++) {
			let ocupate = 0,
				libere = 0;
			for (let j = 0; j < results[i].length; j++) {
				if (results[i][j].liber == true) libere++;
				else ocupate++;
			}
			rez.push({
				libere,
				ocupate,
			});
		}

		let achitari;
		if (results[9].length > 12) {
			achitari = results[9].slice(results[9].length - 12);
		} else {
			achitari = results[9];
		}

		res.status(200);
		res.render("metrics", {
			achitarifull: results[9],
			achitari,
			rez,
			evidenta,
			his: [results[10], results[11], results[12], results[13], results[14], results[15], results[16], results[17], results[18]],
		});
	});
});

app.get("*", (req, res) => {
	res.status(404);
	res.render("contract404");
});

const port = process.env.PORT || 3000;
const IP = process.env.IP || "localhost";

app.listen(port, IP, () => {
	console.log(`The server is now listening on ${IP}:${port}`);
});
