const queries = {
  create: `INSERT INTO Profiles (user_id, phone, bio) VALUES ($1, $2, $3) RETURNING *`,
  findById: `SELECT * FROM Profiles WHERE id = $1`,
  findByUserId: `SELECT * FROM Profiles WHERE user_id = $1`,
  deleteById: `DELETE FROM Profiles WHERE id = $1`,
  update: `
        UPDATE Profiles 
        SET phone = $1, 
            bio = $2 
        WHERE id = $3 
        RETURNING *
    `,
} as const;

export default queries;
