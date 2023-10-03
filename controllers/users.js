import mongoose from "mongoose";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
        badge: user.badge,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      {
        $set: { name: name, about: about, tags: tags },
      },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const giveBadgeForUpvote = async (req, res) => {
  const { id: _id } = req.params;
  const { upvotebadge } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const updatedBadge = await users.findByIdAndUpdate(_id, {
      $set: { upvotebadge: upvotebadge },
    });

    res.status(200).json(updatedBadge);
  } catch (error) {
    res.status(405).json({ message: "id not found" });
  }
};

export const giveBadgeForAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerbadge } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const updatedBadge = await users.findByIdAndUpdate(_id, {
      $set: { answerbadge: answerbadge },
    });

    res.status(200).json(updatedBadge);
  } catch (error) {
    res.status(405).json({ message: "id not found" });
  }
};
