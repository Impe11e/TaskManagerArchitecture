export const queries = {
  create: `INSERT INTO Tasks (title, description, status, priority, due_date) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
  findById: `SELECT * FROM Tasks WHERE id = $1`,
  getAll: `SELECT * FROM Tasks ORDER BY id`,
  update: `UPDATE Tasks SET title=$1, description=$2, status=$3, priority=$4, due_date=$5 WHERE id = $6 RETURNING *`,
  deleteById: `DELETE FROM Tasks WHERE id = $1`,
  findByTitle: `SELECT * FROM Tasks WHERE title = $1 LIMIT 1`,
  countByStatus: `SELECT COUNT(*)::int AS count FROM Tasks WHERE status = $1`,
};
