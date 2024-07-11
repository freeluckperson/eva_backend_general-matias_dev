// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "db8y8eb5s",
//   api_key: "132569467224211",
//   api_secret: "2nJNfjY_893J_jVCG1y1kbsQE1U",
// });

// export async function uploadImage(filePath) {
//   return await cloudinary.uploader.upload(filePath, {
//     folder: "fotosEva",
//   });
// }

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "db8y8eb5s",
  api_key: "132569467224211",
  api_secret: "2nJNfjY_893J_jVCG1y1kbsQE1U",
});

export async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "FotosEva",
      use_filename: true,
      unique_filename: false,
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
