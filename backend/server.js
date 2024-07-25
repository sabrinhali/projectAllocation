const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const user = require("./models/userModel.js");
const admin = require("./models/adminModel.js");
const projectModel = require("./models/projectModel.js");
const Notices = require("./models/NoticesModel.js");
const { title } = require("process");



const app = express()
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connecting to the database
mongoose
  .connect("mongodb://0.0.0.0:27017/ProjectAllocation")
  .then(() => {
  console.log("Database has been connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// Signup as user
app.post("/signup", async(req,res)=>{
  const newuser = user(req.body)
  const savedate = await newuser.save()
  res.send(savedate)
})


// login as user
app.post("/signup/login",async(req,res)=>{

  if(req.body.username && req.body.password){
    const Userlogin =  await user.findOne(req.body)
    if(Userlogin){
        res.send(Userlogin)
    }
    else{
        res.send("User not found")
       }
  }
  else{
    res.send("username and password are required")
  }
})

// users Read api starts here
// show all Users
app.get("/users", async (req, res) => {
  const getData = await user.find();
  res.send(getData);
})

// show individual User
app.get("/user/:id", async (req, res) => {
  const singleUser = await user.find({ _id: req.params.id})
  res.send(singleUser);
})

// total of the User
app.get("/total/users", async (req, res) => {
  const totalUsers = await user.find().countDocuments();
  res.send({ totalUsers });
});

// User Search api
app.get("/user/data/:key", async (req, res) => {
  try {
    const searchUser = await user.find({
      $or: [
        {
          name: { $regex: req.params.key },
        },
        {
          username: { $regex: req.params.key },
        },
      ],
    });
    res.send(searchUser);
  } catch (error) {
    console.log(error);
  }
});

// update user
app.put("/user/update/:id", async(req, res) => {
  const updateUser = await user.updateOne(
      {_id: req.params.id},
      {$set: req.body}
      )
      res.send(updateUser)
})

// delete user
app.delete("/user/delete/:id", async (req, res) => {
  try{
   const deleteUser = await user.deleteOne({_id: req.params.id})
   res.send(deleteUser);
  }
  catch(error){
   console.log(error)
  }


})

// Admin login api starts here
//registering Admin
app.post("/admin", async (req, res) => {
  const adminData = admin(req.body)
  const savedAdmin = await adminData.save()
  res.send(savedAdmin)
})

//login admin to verify that it's admin
app.post("/admin/login",async (req, res) => {

  if(req.body.username && req.body.password){
      
      const admindata = await admin.findOne(req.body)
      if(admindata){
          res.send(admindata)
      }
      else {
          res.send("admin not found")
      }
  }

  else {
      res.send("Username and password required")
  }
  
})

// Project Table starts here....................................................
// registering projects
app.post("/register",  async(req, res) => {
  const projectData = projectModel({
    className: req.body.className,
    groupNumber: req.body.groupNumber,
    topic: req.body.topic,
    technology: req.body.technology,
    supervisor: req.body.supervisor,
    mobile: req.body.mobile,
    year: req.body.year,

  });

  const savedData = await projectData.save()
  res.send(savedData);
})

// show all projects
app.get("/projects", async (req, res) => {
  const getData = await projectModel.find();
  res.send(getData);
})

// show individual project
app.get("/project/:id", async (req, res) => {
  const singleProject = await projectModel.find({ _id: req.params.id})
  res.send(singleProject);
})

// total of the project
app.get("/total/projects", async (req, res) => {
  const totalProjects = await projectModel.find().countDocuments();
  res.send({ totalProjects });
});

// Project Search api
app.get("/project/data/:key", async (req, res) => {
  try {
    const searchProject = await projectModel.find({
      $or: [
        {
          className: { $regex: req.params.key },
        },
        {
          groupNumber: { $regex: req.params.key },
        },
      ],
    });
    res.send(searchProject);
  } catch (error) {
    console.log(error);
  }
});

// update project
app.put("/project/update/:id", async(req, res) => {
  const updateProject = await projectModel.updateOne(
      {_id: req.params.id},
      {$set: req.body}
      )
      res.send(updateProject)
})

// delete project
app.delete("/project/delete/:id", async (req, res) => {
  try{
   const deleteProject = await projectModel.deleteOne({_id: req.params.id})
   res.send(deleteProject);
  }
  catch(error){
   console.log(error)
  }


})


// Input File Upload...............................................................
// File schema and model
const ItemSchema = new mongoose.Schema({
  className: String,
  groupNumber: String,
  filePath: String,
});

const Item = mongoose.model('Item', ItemSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const { className: className, groupNumber} = req.body;
  const newItem = new Item({
    className: className,
    groupNumber,
    filePath: req.file.path,
  });
  await newItem.save();
  res.send(newItem);
});

app.get('/files', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// Search Files 
app.get("/files/data/:key", async (req, res) => {
  try {
    const searchProject = await Item.find({
      $or: [
        {
          className: { $regex: req.params.key },
        },
        {
          groupNumber: { $regex: req.params.key },
        },
      ],
    });
    res.send(searchProject);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/files/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send({ message: 'File not found' });
    }
    res.send({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Failed to delete file' });
  }
});

// total Files
app.get("/total/files", async (req, res) => {
  const totalFiles = await Item.find().countDocuments();
  res.send({ totalFiles });
}); 

// Notices......................................................
// Notices 
// Define a schema and model for the project
const NoticeSchema = new mongoose.Schema({
  title: String,
  filePath: String,
});

const Notice = mongoose.model('Notice', NoticeSchema);

// Configure multer for file uploads
const Nstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadTwo = multer({ Nstorage });

// Route to handle form submission
app.post('/notification', upload.single('file'), async (req, res) => {
  const { title } = req.body;
  const filePath = req.file.path;
  const newNotice = new Notice({ title, filePath });
  await newNotice.save();
  res.json(newNotice);
});

// Route to get all projects
app.get('/notifications', async (req, res) => {
  const notices = await Notice.find();
  res.json(notices);
});

// delete notices 
app.delete('/notifications/:id', async (req, res) => {
  try {
    const item = await Notice.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send({ message: 'File not found' });
    }
    res.send({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Failed to delete file' });
  }
});


app.listen(1000, () => {
    console.log("Server is running on port 1000");
  });
  