export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Check if the request is for a static asset
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      return fetch(request);
    }
    
    // For all other requests, serve the index.html file
    return fetch(`${url.origin}/index.html`, request);
  }
}; 