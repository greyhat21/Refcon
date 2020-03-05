//jshint esversion:6
//required modules (including "ejs")
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('md5');
const session = require('express-session');

const app = express();

//_____________________________ENV VARS(TO BE REMOVED LATER)__________________________________
const SESSIONSECRET = "refconk963ngRg6PFyovLL";
const MONGONLINE = "mongodb+srv://tchkr:k963ngRg6PFyovLL@cluster0-ge7yf.mongodb.net/refconDB";
const MONGOFFLINE = "mongodb://localhost:27017/refconDB";
//____________________________________________________________________________________________

//Application Configurations
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(session({ secret: SESSIONSECRET, resave: false, saveUninitialized: true }));

app.set('view engine', 'ejs');

//=====================================================================================================================
//DB Connection and Schema Setup
mongoose.connect(MONGONLINE, { useNewUrlParser: true, useUnifiedTopology: true} ,(err) => {
    if(err){
        console.log(err);
        }
    else{
        console.log("Connected to database");
    }
});

const refconTeacherSchema = {
  fullName: String,
  phoneNumber: String,
  collegeName: String,
  facultyid: String,
  email: String,
  password: String,
  type: String
};

const refconStudentSchema = {
    fullName: String,
    phoneNumber: String,
    collegeName: String,
    rollNumber: String,
    department: String,
    email: String,
    password: String,
    type: String,
    year: String,
};

const refconMessageSchema = {
    question: String,
    questionTitle: String,
    date: String,
    repliedDate: String,
    to: String,
    fromID: String,
    answer: String
};

const refconInternalMarkSchema = {
    internalNumber: String,
    department: String,
    subjectName: String,
    subjectCode: String,
    year: String,
    semester: String,
    facultyid: String,
    marks:[
        {
            rollNumber: String,
            mark: String
        }
    ]
};

const RefconStudent = mongoose.model("RefconStudent", refconStudentSchema);
const RefconTeacher = mongoose.model("RefconTeacher", refconTeacherSchema);
const RefconMessage = mongoose.model("RefconMessage", refconMessageSchema);
const RefconInternalMark = mongoose.model('RefconInternalMark', refconInternalMarkSchema);

//=====================================================================================================================

//User-defined functions:
var sendDateTime = () => {
    const today = new Date();
    const noToWord = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = noToWord[today.getMonth()];
    const date = today.getDate() + '/' + month + '/' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes();
    return (date + ' ' + time);
};
//=====================================================================================================================

//Requiring User-defined Routes
const login = require('./routes/login');
const register = require('./routes/register');
const overview = require('./routes/overview');
const internalmark = require('./routes/internalmark');
const studenteacherdiscussion = require('./routes/studenteacherdiscussion');
const message = require('./routes/message');
const newmessage = require('./routes/newmessage');
const accountsettings = require('./routes/accountsettings');
const logout = require('./routes/logout');

//Passing params to specific routes
login(app, md5, RefconStudent, RefconTeacher);
register(app, md5, RefconStudent, RefconTeacher);
overview(app);
internalmark(app, RefconStudent, RefconTeacher, RefconInternalMark);
studenteacherdiscussion(app, RefconMessage);
message(app, RefconMessage, sendDateTime);
newmessage(app, RefconMessage, RefconTeacher, sendDateTime);
accountsettings(app, app, md5, RefconStudent, RefconTeacher);
logout(app);

//=====================================================================================================================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => { console.log(`Server started running on port ${PORT}`); });