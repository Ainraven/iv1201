const DataTypes = require("sequelize").DataTypes;
const _availability = require("./availability");
const _competence = require("./competence");
const _competence_profile = require("./competence_profile");
const _person = require("./person");
const _role = require("./role");
const _application = require("./application")

function initModels(sequelize) {
  const availability = _availability(sequelize, DataTypes);
  const competence = _competence(sequelize, DataTypes);
  const competence_profile = _competence_profile(sequelize, DataTypes);
  const person = _person(sequelize, DataTypes);
  const role = _role(sequelize, DataTypes);
  const application = _application(sequelize, DataTypes);

  competence_profile.belongsTo(competence, { as: "competence", foreignKey: "competence_id"});
  competence.hasMany(competence_profile, { as: "competence_profiles", foreignKey: "competence_id"});
  availability.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(availability, { as: "availabilities", foreignKey: "person_id"});
  competence_profile.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(competence_profile, { as: "competence_profiles", foreignKey: "person_id"});
  person.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(person, { as: "people", foreignKey: "role_id"});
  application.belongsTo(person, { as: "person", foreignKey: "person_id"});

  return {
    availability,
    competence,
    competence_profile,
    person,
    role,
    application
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
