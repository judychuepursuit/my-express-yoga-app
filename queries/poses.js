const db = require("../db/dbConfig.js");

// ALL Poses
const getAllPoses = async () => {
  try {
    const allPoses = await db.any("SELECT * FROM yogaposes");
    return allPoses;
  }
  catch (error) {
    return error;
  }
};

// ONE Pose
const getPose = async (id) => {
  try {
    const onePose = await db.one("SELECT * FROM yogaposes WHERE id=$1", id);
    return onePose;
  }
  catch (error) {
    return error;
  }
};

// CREATE
const createPose = async (pose) => {
  try {
    const newPose = await db.one(
      "INSERT INTO yogaposes (name, level, sanskrit, instructions, benefits, website, image_link, is_favorite) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [pose.name, pose.level, pose.sanskrit, pose.instructions, pose.benefits, pose.website, pose.image_link, pose.is_favorite]
    );
    return newPose;
  }
  catch (error) {
    return error;
  }
};

// DELETE
// const deletePose = async (id) => {
//   try {
//     const deletedPose = await db.one(
//       "DELETE FROM yogapose WHERE id = $1 RETURNING *", id
//     );
//     return deletedPose;
//   }
//   catch (error) {
//     return error;
//   }
// };

const deletePose = async (id) => {
  try {
    const deletedPose = await db.one(
      "DELETE FROM yogaposes WHERE id = $1 RETURNING *", id
    );
    return deletedPose;
  }
  catch (error) {
    throw error;
  }
};

// UPDATE
const updatePose = async (id, pose) => {
  try {
    const updatedPose = await db.one(
      "UPDATE yogaposes SET name=$1, level=$2, sanskrit=$3, instructions=$4, benefits=$5, website=$6, image_link=$7, is_favorite=$8 where id=$9 RETURNING *",
      [pose.name, pose.level, pose.sanskrit, pose.instructions, pose.benefits, pose.website, pose.image_link, pose.is_favorite, id]
    );
    return updatedPose;
  }
  catch (error) {
    return error;
  }
};
  
module.exports = {
  getAllPoses,
  getPose,
  createPose,
  deletePose,
  updatePose
};