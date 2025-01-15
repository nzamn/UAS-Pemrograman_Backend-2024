// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  // Method untuk mengambil semua data
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Method untuk menambahkan data
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at	)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const values = [
        data.name,
        data.phone,
        data.address,
        data.status,
        new Date(),
        new Date(),
      ];

      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve({
          id: result.insertId,
          ...data,
          created_at: values[4],
          updated_at: values[5],
        });
      });
    });
  }

    // Method untuk mengambil data pasien berdasarkan ID
    static find(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM patients WHERE id = ?";
        db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0] || null);
        });
    });
    }

  // Method untuk data pasien keluar berdasarkan ID
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE patients
        SET name = ?, phone = ?, address = ?, status = ?, out_date_at = ?
        WHERE id = ?
      `;
      const values = [
        data.name,
        data.phone,
        data.address,
        data.status,
        new Date(),
        id,
      ];

      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        if (result.affectedRows === 0) {
          resolve(null); // Jika tidak ada row yang diperbarui
        } else {
          resolve({ id, ...data, out_date_at: values[4] });
        }
      });
    });
  }

  // Method untuk menghapus data berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }
}


// export class Patient
module.exports = Patient;