const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const result = {
        code: 0,
        message: "hihihihi",
    };

    res.send(result);
});

module.exports = router;
