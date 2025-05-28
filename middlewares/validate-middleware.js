const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {

        const status = 402
        const message = "Input data properly"
        const extraDetails = err.errors[0].message;


        const error = {
            status,
            message,
            extraDetails
        }
        console.log(error);
        next(error)
    }
}

module.exports = validate