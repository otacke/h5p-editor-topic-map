import { useAsync } from "react-async";
import { t } from "../h5p/H5P.util";
import { TranslationKey } from "../types/TranslationKey";

export const useH5PTranslation = (
  key: TranslationKey,
  vars?: Record<string, string>,
): string => {
  const { data: translatedString } = useAsync({
    promiseFn: t.bind(null, key, vars),
  });

  return translatedString ?? "";
};

export const useT = useH5PTranslation;
