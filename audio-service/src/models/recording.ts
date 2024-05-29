
import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export class Recording extends Model<InferAttributes<Recording>, InferCreationAttributes<Recording>> {
  declare id: string;
  declare recording: Blob;
  declare user_email: string;
}

export function initRecording(sequelize: Sequelize): typeof Recording {
  Recording.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      recording: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Recording',
    }
  );

  return Recording;
}