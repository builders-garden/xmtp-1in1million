import fs from "node:fs";
import * as path from "node:path";
import { createImagesWorker } from "frames.js/middleware/images-worker/next";

export const runtime = "nodejs";

const regularFontData = fs.readFileSync(
  path.join(process.cwd(), "public/assets", "Inter-Regular.ttf")
);

const boldFontData = fs.readFileSync(
  path.join(process.cwd(), "public/assets", "Inter-Bold.ttf")
);

const bagelFontData = fs.readFileSync(
  path.join(process.cwd(), "public/assets", "BagelFatOne-Regular.ttf")
);

const sonomaFontData = fs.readFileSync(
  path.join(process.cwd(), "public/assets", "BRSonoma-Regular.otf")
);

const sonomaBoldFontData = fs.readFileSync(
  path.join(process.cwd(), "public/assets", "BRSonoma-Bold.otf")
);

const imagesWorker = createImagesWorker({
  secret: "MY_VERY_SECRET_SECRET",
  imageOptions: {
    debug: false,
    sizes: {
      "1:1": {
        width: 1080,
        height: 1080,
      },
      "1.91:1": {
        width: 955,
        height: 500,
      },
    },
    fonts: [
      {
        data: regularFontData,
        name: "Inter-Regular",
      },
      {
        data: boldFontData,
        name: "Inter-Bold",
      },
      {
        data: bagelFontData,
        name: "BagelFatOne-Regular",
      },
      {
        data: sonomaFontData,
        name: "BRSonoma-Regular",
      },
      {
        data: sonomaBoldFontData,
        name: "BRSonoma-Bold",
      },
    ],
  },
});

export const GET = imagesWorker();
