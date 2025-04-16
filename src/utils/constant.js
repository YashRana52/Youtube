// named export 
export const API_KEY = "AIzaSyAFddpJXyh3QzEgzyhpvXYXfget3p2rXbc";
export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&key=${API_KEY}`;

export const SEARCH_SUGGESTIONS_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
export default API_KEY;
