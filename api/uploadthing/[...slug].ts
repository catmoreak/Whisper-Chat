import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createRouteHandler } from "uploadthing/next";

const f = createUploadthing();

const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
