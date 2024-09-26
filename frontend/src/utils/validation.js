
// This file exports utility functions for input validation.

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password length
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Validate project name length
export const validateProjectName = (projectName) => {
  return projectName.length >= 3 && projectName.length <= 50;
};

// Validate funding goal
export const validateFundingGoal = (fundingGoal) => {
  return fundingGoal > 0;
};

// Validate contribution amount
export const validateContributionAmount = (contributionAmount) => {
  return contributionAmount > 0;
};

// Validate review content length
export const validateReviewContent = (reviewContent) => {
  return reviewContent.length >= 10 && reviewContent.length <= 500;
};

// Validate rating value
export const validateRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

// Validate milestone status
export const validateMilestoneStatus = (milestoneStatus) => {
  const validStatuses = ['pending', 'completed'];
  return validStatuses.includes(milestoneStatus);
};

// validate user registration
export const validateRegistration = (username, email, password, confirmPassword) => {
  return (
    username.length >= 3 &&
    username.length <= 50 &&
    validateEmail(email) &&
    validatePassword(password) &&
    password === confirmPassword
  );
};