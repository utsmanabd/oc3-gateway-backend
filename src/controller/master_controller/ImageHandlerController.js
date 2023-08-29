const path = require("path");
const fs = require("fs");

uploadImage = async (req, res) => {
  const newFileName = req.file.filename;
  return res
    .status(200)
    .json({
      error: false,
      message: "File uploaded successfully",
      filename: newFileName,
    });
};

getImage = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../../uploads/images", filename); // Sesuaikan dengan struktur Anda
  res.sendFile(filePath);
};

deleteImage = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../../uploads/images", filename);

  // Periksa apakah file ada sebelum menghapus
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: true, message: "File not found"});
    } else {
      // Hapus file
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({error: true, message: "Failed to delete file"});
        } else {
          res.status(200).json({error: false, message: "File deleted successfully"});
        }
      });
    }
  });
};

module.exports = { uploadImage, getImage, deleteImage };
