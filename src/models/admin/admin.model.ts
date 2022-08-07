import { throwError } from "../../middleware/cachError";
import bcrypt from 'bcrypt';


const { Sequelize } = require('sequelize');


const adminModel = (sequelise: any, Datatypes: any) => {
    const Admin = sequelise.define('admin', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                customValidator: async (email: string) => {
                    //  allow only email format
                    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                        throwError("Please provide a valid email", 422);
                    }
                }
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: true,
            validate: {
                customValidator(value:string) {
                  if (value === null) {
                    throw new Error("name can't be null unless age is 10");
                  }
                }
            }, 
            set value(value : string) {
                adminModel.prototype.setDataValue("password", bcrypt.hashSync(value, bcrypt.genSaltSync()));
            }
            
        },
        createdAt: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW
        },
        updatedAt: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW
        }
    })

    return Admin;
}


export default adminModel;