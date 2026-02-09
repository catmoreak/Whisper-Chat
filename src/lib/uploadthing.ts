import { UTApi } from "uploadthing/client";


export const utapi = new UTApi({
  token: import.meta.env.VITE_UPLOADTHING_TOKEN,
});
