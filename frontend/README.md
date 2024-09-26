# Frontend

This directory contains the frontend code for the decentralized crowdfunding platform built on the Solana blockchain. The frontend is built using React and Redux for state management.

## Project Structure

The frontend project has the following structure:

- `src/components/Auth`: Contains components related to user authentication.
  - `Login.js`: Component for user login.
  - `Register.js`: Component for user registration.

- `src/components/Project`: Contains components related to project management.
  - `ProjectList.js`: Component for displaying a list of projects.
  - `ProjectDetail.js`: Component for displaying detailed information about a project.
  - `CreateProject.js`: Component for creating a new project.

- `src/components/Contribution`: Contains components related to contributions.
  - `ContributionForm.js`: Component for inputting contribution amounts.
  - `ContributionList.js`: Component for displaying a list of contributions.

- `src/components/Dashboard`: Contains components for user and project dashboards.
  - `UserDashboard.js`: Component for displaying the user's dashboard.
  - `ProjectDashboard.js`: Component for displaying the project initiator's dashboard.

- `src/components/Review`: Contains components for submitting and displaying reviews.
  - `ReviewForm.js`: Component for submitting reviews.
  - `ReviewList.js`: Component for displaying a list of reviews.

- `src/redux/actions`: Contains Redux action creators.
  - `authActions.js`: Action creators for user authentication.
  - `projectActions.js`: Action creators for project management.
  - `contributionActions.js`: Action creators for handling contributions.
  - `reviewActions.js`: Action creators for submitting and retrieving reviews.

- `src/redux/reducers`: Contains Redux reducers.
  - `authReducer.js`: Reducer for managing the authentication state.
  - `projectReducer.js`: Reducer for managing the project state.
  - `contributionReducer.js`: Reducer for managing the contribution state.
  - `reviewReducer.js`: Reducer for managing the review state.

- `src/redux/store.js`: Redux store configuration.

- `src/utils`: Contains utility functions.
  - `api.js`: Utility functions for making API requests.
  - `validation.js`: Utility functions for input validation.

- `src/App.js`: Entry point of the frontend application.
- `src/index.js`: Renders the root component and mounts it to the DOM.
- `src/styles/main.css`: Main CSS styles for the application.

## Getting Started

To run the frontend locally, follow these steps:

1. Install the dependencies: `npm install`.
2. Start the development server: `npm start`.
3. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Please note that this is a template and you may need to modify it according to your specific project requirements.