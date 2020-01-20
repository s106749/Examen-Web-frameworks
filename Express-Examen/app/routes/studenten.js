var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var db;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database.db('exam')
})

/* GET ALL STUDENTS */
router.get('/', (req, res) => {
    db.collection('students').find().toArray((err, result) => {
      if (err) return
      res.render('list.ejs', { students: result })
    })
  })

/* SHOW ADD FORM */
router.get('/add', (req, res) => {
    res.render('add.ejs', {})
 })

/* ADD STUDENT */
router.post('/add', (req, res) => {
  var student = { naam: req.body.naam, geboortedatum: req.body.geboortedatum, studierichting: req.body.studierichting };
  db.collection('students').findOne(student, (err, result) => {
    if (err) return
    if (result) {
      res.render('studentexists.ejs', {})
    } else {
      db.collection('students').insertOne({ naam: req.body.naam, geboortedatum: req.body.geboortedatum, studierichting: req.body.studierichting }, (err, result) => {
        res.redirect('/')
      })
    }
  })
})

module.exports = router;