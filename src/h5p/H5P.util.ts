/* eslint-disable @typescript-eslint/no-explicit-any */
import { H5PObject, H5PEditorObject } from "../../H5P";
import { TranslationKey } from "../types/TranslationKey";
import { sleep } from "../utils/async.utils";

let translateJsonHasLoaded = false;

export const H5P: H5PObject = (window as any).H5P ?? {};
export const H5PEditor: H5PEditorObject = (window as any).H5PEditor ?? {};
export const t: (
  key: TranslationKey,
  vars?: Record<string, string>,
) => Promise<string> = async (key, vars) => {
  let text = H5PEditor.t("H5PEditor.TopicMap", key, vars);

  while (!translateJsonHasLoaded) {
    translateJsonHasLoaded =
      text !== "Missing translations for library H5PEditor.TopicMap";

    // eslint-disable-next-line no-await-in-loop
    await sleep(300);

    text = H5PEditor.t("H5PEditor.TopicMap", key, vars);
  }

  return text;
};

// export const t: (
//   key: TranslationKey,
//   vars?: Record<string, string>,
// ) => Promise<string> = (key, vars) => {
//   let text = H5PEditor.t("H5PEditor.TopicMap", key, vars);

//   return new Promise(resolve => {
//     const interval = window.setInterval(() => {
//       translateJsonHasLoaded =
//         text !== "Missing translations for library H5PEditor.TopicMap";

//       if (translateJsonHasLoaded) {
//         console.log("translateJsonHasLoaded")
//         clearInterval(interval);
//         resolve(text);
//       } else {
//         console.log("no")
//         text = H5PEditor.t("H5PEditor.TopicMap", key, vars);
//       }
//     }, 200);
//   });
// };

/**
 * Get absolute path to image from relative parameters path
 *
 * @param path Relative path as found in content parameters
 * @returns Absolute path to image
 */
export const getAbsoluteUrlFromRelativePath = (path: string): string => {
  return H5P.getPath(path, H5PEditor.contentId);
};

export const getImageUrl = (imagePath: string | undefined): string | null => {
  if (!imagePath) {
    return null;
  }

  const imagePathIsAbsolute =
    imagePath.startsWith("http://") || imagePath.startsWith("https://");

  const imageUrl = imagePathIsAbsolute
    ? imagePath
    : getAbsoluteUrlFromRelativePath(imagePath);

  return imageUrl;
};
