const faker = require("faker");

function main() {
  const tree = createTree({},5,0, Math.round(Math.random(1)));
  console.log(JSON.stringify(tree));
}

/**
 * Create a family tree with specified levels
 * @param {*} element Pass an empty object to start the tree if you don't have a starting node
 * @param {*} maxLevel Maximum levels to create the tree
 * @param {*} level Start with 0
 * @param {*} sex 0 for male, 1 for female
 */
function createTree(element, maxLevel, level, sex) {
  const currentYear = new Date().getFullYear();
  const item = Object.keys(element).length ? element : createPerson(sex,currentYear);
  if ((maxLevel === "undefined" && level <= 5) || level <= maxLevel) {
   const startYear = currentYear - (level * 25);
   item.mother = createTree(createPerson(1,startYear),maxLevel,level + 1, 1);
   item.father = createTree(createPerson(0, startYear),maxLevel,level + 1, 0);
  }
  return item;
}

/**
 * Create a person using faker
 * @param {*} sex (0 form male, 1 for female)
 * @param {*} startingDateYear Generates a birth date inside of that calendar year
 */
function createPerson(sex, startingDateYear) {
  const person = {};
  person.firstName = faker.name.firstName(sex);
  person.lastName = faker.name.lastName();
  person.sex = sex === 0 ? "male" : "female";

  if(startingDateYear){
     person.birthDate = faker.date.between(startingDateYear + '-01-01', startingDateYear + '-12-30');
  }
  return person;
}

main();
