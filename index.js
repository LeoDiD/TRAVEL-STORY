require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");

const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const TravelStory = require("./models/travelStory.model");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser  = await User.findOne({ email });
    if (isUser ) {
        return res.status(400).json({ error: true, message: "User  already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.status(201).json({
        error: false,
        user: { fullName: user.fullName, email: user.email },
        accessToken,
        message: "Registration Successful"
    });
});

app.post("/login", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email  and Password are required"});
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.json({
        error: false,
        message: "Login Successful",
        user: { fullName: user.fullName, email: user.email},
        accessToken,
    });
});

app.post("/get-user", authenticateToken, async (req, res) => {
    const { userId } = req.user
    
    const isUser = await User.findOne({_id: userId });
    
    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: "",
    });
});

app.post("/add-travel-story", authenticateToken, async (req, res) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }


    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate,
        });
        
        await travelStory.save();
        res.status(201).json({ story: travelStory, message:"Added Suaaasccesfully"});
    } catch (error) {
        res.status(400).json ({ error: true, message: error.message });
    }

});

app.get("/get-all-stories", authenticateToken, async (req, res) => {
    const { userid } = res.user;

    try{
        const travelStories = await TravelStory.find({ userId: userid }).sort({
            isFavorite: -1,
        });
    res.status(200).json({stories: travelStories});
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.post("/image-upload", upload.single("image"), async (req, res) => {

    try {
        if (!req.file) {
            return res
            .status(400)
            .json({ error: true, message: "No image uploaded"});
        }
    

const imageUrl = `https://localhost:8000/uploads/${req.file.filename}`;

    res.status(201).json({ imageUrl });
} catch (error) {
    res.status(500).json({ error: true, message: error.message });
}
});

app.delete("/delete-image", async (req, res) => {
    const { imageUrl } = req.query;

    if (!imageUrl) {
        return res 
        .status(400)
        .json({ error: true, message: "imageUrl parameter is requiredd" });
    }

    try{
        const filename = path.basename(imageUrl);

        const filepath = path.join(__dirname, 'uploads', filename);
    
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        res.status(200).json({ message: "Image  deleted successfully"});
    } else {
        res.status(404).json({ error: true, message: "Image not found" });
    }
    } catch (error) {
        res.status(200).json({ error: true, message: error.message });
    }
});


app.post("/edit-story/:id", async (req, res) => {
    const { id } = req.params;
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    if(!title || !story || !visitedLocation|| !imageUrl || !visitedDate) {
        return res
        .status(400)
        .json({ error: true, message: "" });

        const parsedVisitedDate = new Date(parseInt(visitedDate));
    }
    try{
        const travelStory = await TravelStory.findOne({ _id, userId: userId });

        if (!travelStory) {
            return res.status(404).json({ error: true, message: "Travel story not found" });
        }

    const placeholderImgUrl = `http://localhost:8000/assets/placeholder.png`;

    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedDAte = visitedDate;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl;

    await travelStory.save();
    res.status(200).json({ story:travelStory, message:"Update Successful" });
} catch (error) {
    res.status(200).json({ error: true, message: error.message });
}
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;