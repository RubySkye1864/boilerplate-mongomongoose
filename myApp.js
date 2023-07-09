const mongoose = require("mongoose");
require("dotenv").config();

// Retrieve the MongoDB URI from the environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to the database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//Creating the Schema
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Creating the PersonModel
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var janeDoe = new Person({
    name: "Jane Doe",
    age: 35,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });

  janeDoe.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//Create many people
var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] },
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  });
};

//Modify findPeopleByName
var findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

//Modify findPersonById
var findPersonById = function (personId, done) {
  Person.findById({ _id: personId }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//Modify findEditThenSave

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // .findById() method to find a person by _id with the parameter personId as search key.
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

//Modify findOneByFood
var findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//Modify findAndUpdate
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

//Modify removeById
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
