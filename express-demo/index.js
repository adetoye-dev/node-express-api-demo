const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

//Handling basic get request with express api
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//Handling specific get request with express api
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).send("Course Not Found!");
  res.send(course);
});

//Handling post request with express api
app.post("/api/courses", async (req, res) => {
  try {
    //validate user input based on the conditions set in the schema object
    const value = await validateCourse(req.body);

    //create and return new course if the input is valid
    const course = {
      id: courses.length + 1,
      name: value.name,
    };

    courses.push(course);
    res.send(course);
  } catch (err) {
    //return error if input validation fails
    res.send(err.details[0].message);
  }
});

//Handling a put request with express api
app.put("/api/courses/:id", async (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).send("Course Not Found!");

  try {
    //validate user input based on the conditions set in the schema object
    const value = await validateCourse(req.body);

    //update course
    course.name = value.name;

    //return course
    res.send(course);
  } catch (err) {
    //return error if input validation fails
    res.send(err.details[0].message);
  }
});

function validateCourse(course) {
  //Create a schema object with the input requirements
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validateAsync(course);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) return res.status(404).send("Course Not Found!");

  //delete course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //return courses
  res.send(courses);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
