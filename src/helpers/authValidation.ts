import {body} from 'express-validator'

export const registerValidation = [
  body('email', 'wrong email').isEmail(),
  body('password', 'min 5 symbols').isLength({min: 5}),
  body('password', 'max 50 symbols').isLength({max: 50}),
  body('name', 'min 3 symbols').isLength({min: 3}),
  body('name', 'max 100 symbols').isLength({max: 100}),
];

export const loginValidation = [
  body('email', 'wrong email').isEmail(),
  body('password', 'min 5 symbols').isLength({min: 5}),
  body('password', 'max 50 symbols').isLength({max: 50}),
];