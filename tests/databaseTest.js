import { Sequelize } from 'sequelize';
import configData from '../integration/config/config.js';

const env = process.env.NODE_ENV || 'development';
const config = configData[env];

export { Sequelize, config };
const sequelize = new Sequelize(config);
 

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


//const jane = sequelize.model.person.create({name: 'Jane'})

//const jane =  sequelize.models.person.findAll();
//console.log(jane.toJSON());
