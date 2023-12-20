const express = require('express');
const router = express.Router();
const Student = require('../models/student');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
      const students = await Student.find();
      res.json(students);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const student = new Student({
      name: req.body.name,
      age: req.body.age,
      grade: req.body.grade,
  });

  try {
      const newStudent = await student.save();
      console.log(newStudent);
      res.status(201).json(newStudent);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
      await Student.findByIdAndDelete(req.params.id);
      res.json({ message: 'Student deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Additional Challenge: PUT /students/:id
router.put('/:id', async (req, res) => {
  try {
      const updatedStudent = await Student.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      res.json(updatedStudent);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

module.exports = router;
