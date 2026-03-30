const create = `INSERT INTO Users (username,email,password) VALUES ($1,$2,$3) RETURNING *`
const findById = `SELECT * FROM Users WHERE id = $1`
const deleteById=`DELETE FROM Users WHERE id = $1`

//used for now
const buildUpdateQuery = (fields) => {
    const setClause = fields
        .map((f, i) => `${f} = $${i + 1}`)
        .join(", ");

    return `
        UPDATE Users
        SET ${setClause}
        WHERE id = $${fields.length + 1}
        RETURNING *
    `;
};

const update = `
    UPDATE Users
    SET username=$1, email=$2, password=$3
    WHERE id = $4
    RETURNING *
`;

const findUsername = `SELECT * FROM Users WHERE username = $1`
const findEmail = `SELECT * FROM Users WHERE email = $1`

export default {
    create,
    findById,
    deleteById,
    buildUpdateQuery,
    update,
    findUsername,
    findEmail
}
