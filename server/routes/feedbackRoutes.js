import express from "express";
import {
  getAllFeedback,
  submitFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/", getAllFeedback);
feedbackRouter.post("/", submitFeedback);
feedbackRouter.delete("/:id", deleteFeedback);

export default feedbackRouter;
