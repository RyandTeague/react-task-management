// Importing the jwtDecode package and a custom axios instance from a separate file
import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Async function that fetches more data for a given resource
export const fetchMoreData = async (resource, setResource) => {
  try {
    // Making a GET request using the custom axios instance and the "next" link of the resource
    const { data } = await axiosReq.get(resource.next);
    
    // Updating the resource state by appending the new results and updating the "next" link
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        // Filtering out any duplicate results by checking for duplicate ids
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

// Function that sets the refresh token timestamp in local storage
export const setTokenTimestamp = (data) => {
  // Decoding the JWT refresh token to get its expiration time and storing it in local storage
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Function that checks if the refresh token has expired and needs to be refreshed
export const shouldRefreshToken = () => {
  // Checking if a refresh token timestamp exists in local storage
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// Function that removes the refresh token timestamp from local storage
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count + 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count - 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};