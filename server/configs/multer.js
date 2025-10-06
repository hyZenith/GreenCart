import multer from "multer";

// Use memory storage so files are available as buffers (req.files[i].buffer)
const storage = multer.memoryStorage();
export const upload = multer({ storage });
