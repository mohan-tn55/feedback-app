import React, { useState } from "react";

const MAX_FEEDBACK = 500;

const FeedbackForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!feedback.trim()) {
      newErrors.feedback = "Feedback cannot be empty.";
    } else if (feedback.trim().length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      onSubmit({ name: name.trim(), feedback: feedback.trim() });
      setName("");
      setFeedback("");
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    }, 400);
  };

  return (
    <div className="card-glow rounded-2xl p-6 sm:p-8" style={{ background: "#1F1F1F" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="logo-dot"></span>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#F97316" }}>
            Share Your Thoughts
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white">Submit Feedback</h2>
        <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
          We read every message — your opinion shapes what we build next.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" style={{ color: "#D1D5DB" }}>
            Full Name <span style={{ color: "#F97316" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Enter your full name"
            className="input-style rounded-lg px-4 py-3 text-sm w-full"
            maxLength={60}
          />
          {errors.name && (
            <p className="text-xs flex items-center gap-1" style={{ color: "#F97316" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 4h2v5H7V4zm0 6h2v2H7v-2z"/>
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Feedback Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" style={{ color: "#D1D5DB" }}>
            Your Feedback <span style={{ color: "#F97316" }}>*</span>
          </label>
          <textarea
            value={feedback}
            onChange={(e) => {
              if (e.target.value.length <= MAX_FEEDBACK) {
                setFeedback(e.target.value);
              }
              if (errors.feedback) setErrors((prev) => ({ ...prev, feedback: undefined }));
            }}
            placeholder="Tell us what you think — what worked, what didn't, what you'd love to see..."
            rows={5}
            className="input-style rounded-lg px-4 py-3 text-sm w-full resize-none"
          />
          <div className="flex justify-between items-center">
            {errors.feedback ? (
              <p className="text-xs flex items-center gap-1" style={{ color: "#F97316" }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 4h2v5H7V4zm0 6h2v2H7v-2z"/>
                </svg>
                {errors.feedback}
              </p>
            ) : (
              <span />
            )}
            <span
              className={`char-counter ${feedback.length > MAX_FEEDBACK * 0.85 ? "warning" : ""}`}
            >
              {feedback.length}/{MAX_FEEDBACK}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-orange text-white font-semibold rounded-lg py-3 px-6 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Submitting...
            </>
          ) : submitted ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Submitted!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
