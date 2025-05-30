// src/api.js

import mockData from "./mock-data";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {

  //Start progress bar loading
  NProgress.start();

  try {
    //Use mock data for local testing
    if (window.location.href.startsWith('http://localhost')) {
      return mockData;
    }

    //Use mock data for mock production URL testing for meet-logo.svg path
    if (window.location.href.startsWith('http://production')) {
      return mockData;
    }

    //PWA - User is offline, return local storage cached events or empty array
    if (!navigator.onLine) {
      const events = localStorage.getItem("lastEvents");
      return events ? JSON.parse(events) : [];
    }

    const token = await getAccessToken();

    if (token) {
      removeQuery();
      const url = "https://ixoirgq7bd.execute-api.us-east-1.amazonaws.com/dev/api/get-events" + "/" + token;
      const response = await fetch(url);
      const result = await response.json();

      if (result) {
        localStorage.setItem("lastEvents", JSON.stringify(result.events));
        return result.events;
      } else return null;
    }
  } catch (error) {
    console.error("api.js|Failed to fetch events:", error);
    return null;
  }
  finally {
    NProgress.done();
  }



};

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Retreives access token from Google using authentication 
 * code parameter.
 * @param {*} code 
 * @returns access_token for Google Calendar API
 */
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch('https://ixoirgq7bd.execute-api.us-east-1.amazonaws.com/dev/api/token' + '/' + encodeCode);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
}

/**
 * Checks validity of access token with Google
 * @param {*} accessToken 
 * @returns 
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

/**
 * This function will ensure user has authenticated and has a valid
 * access token to use Google Calendar API - if no token found, will
 * check for auth code, if no code then redirct to Google Authorization
 * screen where they can sign in and receive their code.
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://ixoirgq7bd.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;

};

/**
 * Cleans up URL in browser
 */
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};