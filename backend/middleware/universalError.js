const universalErrorHandler = (err, req, res, next) => {
    console.error("Something went wrong:", err.message || err);
    res.status(500).json({ message: "Something went wrong." });
};
module.exports={universalErrorHandler}