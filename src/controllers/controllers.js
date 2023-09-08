import { pool } from "../db/db.js";

export const home = (req, res) => {
  res.send("Welcome to main page")
}


export const getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from students");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting students"
    })
  }
};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("select * from students where id = ? ", [
      id,
    ]);

    if (rows.length <= 0) return res.status(404).json({
      message: "Student not found",
    });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting students",
    });
  }
};

export const newStudents = async (req, res) => {
  try {
    const { name, lastname, califications } = req.body;
    const [rows] = await pool.query(
      "insert into students (name, lastname, califications) values (?,?,?)",
      [name, lastname, califications]
    );
    res.send({
      id: rows.insertId,
      name,
      lastname,
      califications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in create a new student",
    });
  }
};

export const updateStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, califications } = req.body;
    const [result] = await pool.query(
      "update students set name = ifnull(?, name), lastname = ifnull(?, lastname), califications = ifnull(?, califications) where id = ? ",
      [name, lastname, califications, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "student not found",
      });

    const [rows] = await pool.query("select * from students where id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error update students",
    });
  }
};

export const deleteStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("delete from students where id = ? ", [
      id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Student not found",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message : "Error delete student"
    });
  }
};
