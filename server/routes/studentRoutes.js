const student_ctrl = require('../controllers/student_ctrl')
const { body } = require('express-validator')
const { major } = require('../models')

module.exports = (app) => {
    const router = app.Router()

    router.get('/', student_ctrl.index)
    router.get('/:id', student_ctrl.detail)
    router.post('/', [
        body('firstName').isString().notEmpty(),
        body('lastName').isString().notEmpty(),
        body('classes').isString().notEmpty().custom(async (value) => {
            const classValue = ["X", "XI", "XII", "XII"]
            const isValid = classValue.includes(value)

            if (!isValid) {
                throw new Error('classes is not registered!');
            }
        }),
        body('gender').isString().notEmpty().custom(async (value) => {
            const genderVal = ["M", "F"]
            const isValid = genderVal.includes(value)

            if (!isValid) {
                throw new Error('gender is not registered!');
            }
        }),
        body('major_id').isString().notEmpty().custom(async (value) => {
            const majorValue = await major.findByPk(value)
            if (!!majorValue == false) {
                throw new Error('gender is not registered!');
            }
        }),
    ], student_ctrl.save)
    router.put('/:id',
        [
            body('firstName').isString().notEmpty(),
            body('lastName').isString().notEmpty(),
            body('classes').isString().notEmpty().custom(async (value) => {
                const classValue = ["X", "XI", "XII", "XII"]
                const isValid = classValue.includes(value)

                if (!isValid) {
                    throw new Error('classes is not registered!');
                }
            }),
            body('gender').isString().notEmpty().custom(async (value) => {
                const genderVal = ["M", "F"]
                const isValid = genderVal.includes(value)

                if (!isValid) {
                    throw new Error('gender is not registered!');
                }
            }),
            body('major_id').isString().notEmpty().custom(async (value) => {
                const majorValue = await major.findByPk(value)
                if (!!majorValue == false) {
                    throw new Error('gender is not registered!');
                }
            })
        ], student_ctrl.update)
    router.delete('/:id', student_ctrl.destroy)

    return router
}