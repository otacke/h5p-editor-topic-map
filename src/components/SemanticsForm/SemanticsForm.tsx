import * as React from "react";
import styles from "./SemanticsForm.module.scss";
import { H5PEditor, t } from "../../h5p/H5P.util";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import $ from "jquery";

export type SemanticsFormProps = {
  fields: Array<H5PField>;
  params: Params;
  parent: H5PForm;
  formClassName?: string;
  onSave: (params: Params) => void;
};

export const SemanticsForm: React.FC<SemanticsFormProps> = ({
  fields,
  params,
  parent,
  formClassName,
  onSave,
}) => {
  const generatedFormRef = React.useRef<HTMLDivElement>(null);
  const saveLabel = t("semantics-form_save");

  const isSaveButtonDisabled =
    Array.from($(".h5peditor-required"))
      .map(span => span.parentElement!.getAttribute("for"))
      .map(id => document.getElementById(id!) as HTMLInputElement)
      .filter(Boolean)
      .filter(inputElement => inputElement?.value?.trim() === "").length > 0;

  React.useEffect(() => {
    if (!generatedFormRef.current) {
      return;
    }

    const $wrapper = H5PEditor.$(generatedFormRef.current);
    H5PEditor.processSemanticsChunk(fields, params, $wrapper, parent);
  }, [fields, params, parent, generatedFormRef]);

  return (
    <form className={`${formClassName} h5peditor`}>
      <div ref={generatedFormRef} />
      <button
        type="button"
        className={styles.saveButton}
        onClick={() => onSave(params)}
        disabled={isSaveButtonDisabled}
      >
        {saveLabel}
      </button>
    </form>
  );
};
