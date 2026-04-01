const create = `INSERT INTO Profiles (user_id, phone, bio) VALUES ($1, $2, $3) RETURNING *`;
const findById = `SELECT * FROM Profiles WHERE id = $1`;
const findByUserId = `SELECT * FROM Profiles WHERE user_id = $1`;
const deleteById = `DELETE FROM Profiles WHERE id = $1`;
const update = `
    UPDATE Profiles 
    SET phone = $1, bio = $2 
    WHERE id = $3 
    RETURNING *
`;

export default {
  create,
  findById,
  findByUserId,
  deleteById,
  update,
};
