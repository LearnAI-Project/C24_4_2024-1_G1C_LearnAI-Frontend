import { ReactNode } from "react";

export const DefaultField = ({
  label,
  input,
}: {
  label: string;
  input: ReactNode;
}) => {
  return (
    <div className="form__field">
      <label className="interactive--xl">{label}</label>
      {input}
    </div>
  );
};

export const DoubleLabelField = ({
  primary_label,
  secondary_label,
  input,
}: {
  primary_label: string;
  secondary_label: ReactNode;
  input: ReactNode;
}) => {

  return (
    <div className="form__field">
      <div className="label__container interactive--xl">
        <label>{primary_label}</label>
        {secondary_label}
      </div>
      {input}
    </div>
  );
};
