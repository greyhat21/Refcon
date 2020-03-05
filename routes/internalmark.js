//jshint esversion:10

module.exports = (app, RefconStudent, RefconTeacher, RefconInternalMark) => {


    app.get("/internalmark", (req, res) => {
        if(!req.session.user){
            res.render('login', {typerror: "You haven't logged in or your're session might have ended", success: ""});
        }
        else{
            res.render('internalmark');
        }
    });

    app.get('/markspace', (req, res) => {
        if(!req.session.user){
            res.render('login', {typerror: "You haven't logged in or your're session might have ended", success: ""});
        }
        else{
            res.render('markspace');
        }
    });

    app.post('/markspace', (req, res) => {
        const internalNumber = req.body.internalNumber;
        const department = req.body.department;
        const subjectName = req.body.subjectName;
        const subjectCode = req.body.subjectCode;
        const year = req.body.year;
        const semester = req.body.semester;
        const facultyid = req.body.facultyid;
        
        const rollNumbers = [];

        RefconStudent.find({$and: [{department: (department)}, {year: (year)}]}, (err, data) => {
            for(var i=0; i<data.length; i++){
                rollNumbers.push(data[i].rollNumber);
            }
            res.render('displaytable', { subjectName: subjectName, department: department.toUpperCase(), year: year, internalNumber: internalNumber, rollNumbers: rollNumbers});
        });
    });

    app.post('displaytable', (req, res) => {

    });











};