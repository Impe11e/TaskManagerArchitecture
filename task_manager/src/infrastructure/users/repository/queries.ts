const quiries = {
    create: `INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
    findById: `SELECT * FROM Users WHERE id = $1`,
    deleteById: `DELETE FROM Users WHERE id = $1`,
    update: `
        UPDATE Users
        SET username=$1,
            email=$2,
            password=$3
        WHERE id = $4 RETURNING *
    `,
    findUsername: `SELECT * FROM Users WHERE username = $1`,
    findEmail: `SELECT * FROM Users WHERE email = $1`
} as const;


export default quiries
