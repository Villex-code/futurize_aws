// utils/auth0.js
import { initAuth0 } from "@auth0/nextjs-auth0";

const auth0 = initAuth0({
  secret: "bea24e81e00934793f98e4a98e0b89b813586a889bc3a636e09e5a261533552c",
  issuerBaseURL: "https://dev-oc4at4s1z165wjqe.us.auth0.com",
  baseURL: "http://localhost:3000",
  clientID: "D5GGsO14N8QtHR0wSQkbF9hLdpZgcZIO",
  clientSecret:
    "O7kGbSrXIbE-1LuiPovF88Ug0ZHqd4tj3CH1gsqDRJlnXHGTftqYfAUw_9VVfVok",
});

export default auth0;
