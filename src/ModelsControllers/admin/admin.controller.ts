import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Jwt from 'jsonwebtoken';

import { getMutatedMomgooseField } from '../../helpers/utils';
import { throwError } from '../../middleware/cacheError';
import { adminModelTypes, adminModelTypings } from '../../types/ModelTypings';
import { Admin } from './model.admin';

export const createAdmin: RequestHandler = async (req, res, next) => {
  const { email: adminEmail } = req?.body;

  try {
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;

    if (!password || !username || !email) {
      throwError('Please fill all the fields', StatusCodes.BAD_REQUEST);
    }

    if (await Admin?.emailTaken(adminEmail)) {
      throwError(
        'You are already registered, just log in to your account',
        StatusCodes.BAD_REQUEST
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error: any) {
    next(error);
  }
};

const signInAdmin: RequestHandler = async (req, res, next) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    const loginAdmin = await Admin.findOne<adminModelTypings>({
      email: email,
    });
    if (!loginAdmin) {
      throwError('Admin not found with the email provided', 404);
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        loginAdmin.password!
      );
      if (!comparePassword) {
        throw new Error('Invalid password');
      }
      const token = Jwt.sign(
        {
          email: loginAdmin.email,
          id: loginAdmin._id,
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: '30 days' }
      );

      res.status(200).json({
        message: 'Admin logged in successfully',
        token,
        adminId: loginAdmin._id,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

const getAdmin: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.params.adminId;
    if (!adminId) {
      throwError('Admin id is not found', 404);
    }
    const findAdmin: any = await Admin.findOne<adminModelTypes>({
      _id: adminId,
    }).exec();
    if (!findAdmin) throwError('Admin not found', StatusCodes.NOT_FOUND);
    res.status(200).json({
      adminid: findAdmin!._id,
      message: 'Admin fetch successfully',
      profileData: getMutatedMomgooseField(findAdmin._doc),
    });
  } catch (error: any) {
    next(error);
  }
};

export { signInAdmin, getAdmin };
