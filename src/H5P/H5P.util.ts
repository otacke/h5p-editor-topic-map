import { H5PEditor } from "h5p-utils/src/utils/H5P.utils";
import { TranslationKey } from "../types/TranslationKey";

export const t: (
  key: TranslationKey,
  vars?: Record<string, string>,
) => string = (key, vars) => H5PEditor.t("H5PEditor.TopicMap", key, vars);
