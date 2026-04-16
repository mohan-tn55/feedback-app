import Feedback from "../models/Feedback.js";

// GET /api/feedback — Get all feedback entries (newest first)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbackList.length,
      feedbackList,
    });
  } catch (error) {
    console.error("Error in getAllFeedback:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// POST /api/feedback — Submit new feedback
export const submitFeedback = async (req, res) => {
  try {
    const { name, feedback } = req.body;

    // Validate required fields
    if (!name || !feedback) {
      return res.status(400).json({
        success: false,
        message: "Name and feedback are required.",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters.",
      });
    }

    if (feedback.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Feedback must be at least 10 characters.",
      });
    }

    const newFeedback = new Feedback({
      name: name.trim(),
      feedback: feedback.trim(),
    });

    await newFeedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error in submitFeedback:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// DELETE /api/feedback/:id — Delete a feedback entry by ID
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Feedback.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found." });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteFeedback:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
