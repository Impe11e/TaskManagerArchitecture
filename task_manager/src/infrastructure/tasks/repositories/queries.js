
const create = `INSERT INTO Tasks (title, description, status, priority, due_date) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
const findById = `SELECT * FROM Tasks WHERE id = $1`;
const getAll = `SELECT * FROM Tasks ORDER BY id`;
const update = `UPDATE Tasks SET title=$1, description=$2, status=$3, priority=$4, due_date=$5 WHERE id = $6 RETURNING *`;
const deleteById = `DELETE FROM Tasks WHERE id = $1`;
const findByTitle = `SELECT * FROM Tasks WHERE title = $1 LIMIT 1`;
const countByStatus = `SELECT COUNT(*)::int AS count FROM Tasks WHERE status = $1`;

export default {
  create,
  findById,
  getAll,
  update,
  deleteById,
  findByTitle,
  countByStatus,
};
