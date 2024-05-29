import { Sequelize } from 'sequelize';

import { initRecording } from './recording';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './local.db',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const Recording = initRecording(sequelize);


export { sequelize, Recording };