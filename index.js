const port=8000;
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let sql;

const app = express();
app.use(express.json());

//connect to DB
const db = new sqlite3.Database('./database/test.db', sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message);
});

// Adding a new patient, upload the patient photo
app.post('/register-patient', (req, res) => {
  try{
    const {name,address,email,phone,hospital,psychiatrist,password,photo} = req.body;
    sql = "INSERT INTO patients(name,address,email,phone,hospital,psychiatrist,password,photo) VALUES (?,?,?,?,?,?,?,?)";
    db.run(sql,[name,address,email,phone,hospital,psychiatrist,password,photo],(err)=>{
        if (err) return console.error(err.message);

        console.log("registration successful")
  })
    return res.json({
          status: 200,
          success: true
      })
  } catch(error){
      return res.json({
          status: 400,
          success: false
      })
  }
})
//Fetching all the patients in an order for a single psychiatrist (without photos).
app.get('/:psychiatrist/patients', (req,res)=>{
    try{
        const psychiatrist = req.params.psychiatrist;
        sql = `SELECT id, name, address,email,phone,hospital FROM patients WHERE psychiatrist = "${psychiatrist}"`
        db.all(sql,[], (err,rows)=>{
            if (err) return console.error(err.message);
    rows.forEach(element => {
            console.log(element);
    });
})
        
        return res.json({
            status: 200,
            success: true
        })
    } catch(error){
        return res.json({
            status: 400,
            success: false
        })
    }
})
//Fetch the count of how many patients are registered for each psychiatrist in a hospital. 
//This should return, hospital name,  psychiatrist name, patients count.

app.get('/:psychiatrist/count', (req,res)=>{
    try{
        const psychiatrist = req.params.psychiatrist;
        sql = `SELECT COUNT(name) FROM patients WHERE psychiatrist = "${psychiatrist}"`
        db.all(sql,[], (err,rows)=>{
            if (err) return console.error(err.message);
    rows.forEach(element => {
            console.log(element);
    });
})
        
        return res.json({
            status: 200,
            success: true
        })
    } catch(error){
        return res.json({
            status: 400,
            success: false
        })
    }
})



app.listen(port,function(err){          //request is send here
    if(err){
        console.log('Error in running the server',err);
        return;
    }
    console.log('My express is running on port',port);
});
