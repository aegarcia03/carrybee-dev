module.exports = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // abortearly means to collect 

        if (error) {
            //Gather all error messages
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }
        next(); // Data is valid, continue to the controller
    };
};