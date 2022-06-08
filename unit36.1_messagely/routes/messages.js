// const { Router } = require("express");
const express = require("express");
const router = new express.Router();

const Message = require("../models/message");
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");
const ExpressError = require("../expressError");


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureLoggedIn, async function(req, res, next) {
    try {
        const username = req.user.username;
        const msg = await Message.get(req.params.id);

        if (msg.to_user.username !== username && msg.from_user.username !== username) {
            throw new ExpressError("Cannot read this message", 401);
        }

        return res.json({message: msg})

    } catch (e) {
        return next(e);
    }
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/", ensureLoggedIn, async function(req, res, next) {
    try {
        const from_username = req.user.username;
        const { to_username, body } = req.body;

        const msg = await Message.create({from_username, to_username, body})

        return res.json({message: msg})

    } catch(e) {
        return next(e);
    }
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 router.post("/:id/read", ensureLoggedIn, async function(req, res, next) {
    try {
        const { id } = req.params;
        let username = req.user.username;

        const msg = await Message.get(id);

        if (msg.to_user.username !== username) {
            throw new ExpressError("You have to be the right user to mark this message read", 401);
        }

        const message = await Message.markRead(id);

        return res.json({message: message})

    } catch(e) {
        return next(e);
    }
})

module.exports = router;