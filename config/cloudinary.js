const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
    cloud_name: "dnkhznobq",
    api_key: "542275938751632",
    api_secret: "Bnz6BuOIOzimBpdMe0F9Y1iBcZ8"
  });

module.exports = cloudinary;