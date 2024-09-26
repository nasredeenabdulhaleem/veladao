// /solana-crowdfunding-platform/frontend/src/redux/actions/projectActions.js

import { toast } from 'react-toastify';
import { getAllProjects, getProjectById, createProject, getProjectsByOwnerId, updateProjectById } from '../../utils/api';
import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_USER_PROJECTS_SUCCESS,
  FETCH_USER_PROJECTS_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE
} from './types';

// Action to get a list of projects
export const getProjects = () => async (dispatch) => {
  try {
    const res = await getAllProjects()
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PROJECTS_FAILURE,
      payload: { err },
    })
    console.error(err);
  }
};
// Get Projects by Owner ID
export const getProjectsByOwner = (ownerId) => async (dispatch) => {
  try {
    const res = await getProjectsByOwnerId(ownerId);
    dispatch({
      type: FETCH_USER_PROJECTS_SUCCESS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: FETCH_USER_PROJECTS_FAILURE,
      payload: { err },
    });
    console.error(err);
  }
};

// Action to create a new project
export const createNewProject = (projectData, navigate) => async (dispatch) => {
  try {
    const res = await createProject(projectData);
    console.log("res", res);
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: res.data,
    });
    navigate(`/dashboard/project/${res.project.id}`);
    toast.success('Project created successfully');
  } catch (err) {
    console.error(err);
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: err,
    })
    toast.error('Failed to create project');
  };
}

// Action to get project details
export const getProjectDetail = (projectId) => async (dispatch) => {
  try {
    const res = await getProjectById(projectId);
    dispatch({
      type: GET_PROJECT_DETAIL,
      payload: res,
    });
  } catch (err) {
    console.error("detail err", err);
    dispatch({
      type: GET_PROJECT_DETAIL_FAILURE,
      payload: err,
    })

  }
};

export const updateProject = (projectId, projectData, navigate) => async (dispatch) => {
  try {
    const res = await updateProjectById(projectId, projectData);
    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: res.project,
    });
    navigate(`/dashboard/project/${projectId}`, { state: { project: res } });
    toast.success('Project updated successfully');
  } catch (err) {
    console.error(err);
    dispatch({
      type: UPDATE_PROJECT_FAILURE,
      payload: err,
    })
    toast.error('Failed to update project');
  };
}
