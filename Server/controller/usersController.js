const Pool = require('../config/db');


const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = { DeleteUser };