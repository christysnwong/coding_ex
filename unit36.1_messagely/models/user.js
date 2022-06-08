/** User class for message.ly */

const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");

const { BCRYPT_WORK_FACTOR } = require("../config");

/** User of the site. */

class User {
  // constructor({username, password, first_name, last_name, phone}) {
  //   this.username = username,
  //   this.password = password,
  //   this.first_name = first_name,
  //   this.last_name = last_name,
  //   this.phone = phone
  // }

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    const hashed_password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (
              username,
              password,
              first_name,
              last_name,
              phone,
              join_at,
              last_login_at)
            VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
            RETURNING username, password, first_name, last_name, phone`,
      [username, hashed_password, first_name, last_name, phone]
    );

    return result.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {

      if (!username || !password) {
        throw new ExpressError("Username and password required", 400);
      }

      const result = await db.query(
        `SELECT username, password
          FROM users
          WHERE username = $1`,
        [username]
      );

      const user = result.rows[0];

      if (user && (await bcrypt.compare(password, user.password))) {
        return true;
      } else {
        return false;
      }

  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {

      if (!username) {
        throw new ExpressError("Username required", 400);
      }

      const result = await db.query(
        `UPDATE users SET last_login_at = current_timestamp 
          WHERE username=$1
          RETURNING username, last_login_at`,
        [username]
      );

      if (!result.rows[0]) {
        throw new ExpressError(`No such user: ${username}`, 404);
      }

      return result.rows[0];

  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(
      `SELECT username,
        first_name,
        last_name,
        phone
      FROM users
      ORDER BY username`
    );

    return results.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(
      `SELECT username,
        first_name,
        last_name,
        phone,
        join_at,
        last_login_at 
      FROM users where username = $1`, 
      [username]);

    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    return user;
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const results = await db.query(
      `SELECT m.id,
              m.to_username,
              u.first_name,
              u.last_name,
              u.phone,
              m.body,
              m.sent_at,
              m.read_at
        FROM messages AS m
        JOIN users AS u ON m.to_username = u.username
        WHERE from_username = $1`,
      [username]
    );

    const msgs = results.rows;

    if (!msgs) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    return msgs.map((msg) => ({
      id: msg.id,
      to_user: {
        username: msg.to_username,
        first_name: msg.first_name,
        last_name: msg.last_name,
        phone: msg.phone,
      },
      body: msg.body,
      sent_at: msg.sent_at,
      read_at: msg.read_at,
    }));
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const results = await db.query(
      `SELECT m.id,
              m.from_username,
              u.first_name,
              u.last_name,
              u.phone,
              m.body,
              m.sent_at,
              m.read_at
        FROM messages AS m
        JOIN users AS u ON m.from_username = u.username
        WHERE to_username = $1`,
      [username]
    );

    const msgs = results.rows;

    if (!msgs) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }

    return msgs.map((msg) => ({
      id: msg.id,
      from_user: {
        username: msg.from_username,
        first_name: msg.first_name,
        last_name: msg.last_name,
        phone: msg.phone,
      },
      body: msg.body,
      sent_at: msg.sent_at,
      read_at: msg.read_at,
    }));
  }
}

module.exports = User;
