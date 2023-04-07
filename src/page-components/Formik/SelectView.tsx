import { FieldProps } from 'formik';
import Select from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface ISelectView extends FieldProps {
  options: any;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  defaultValue?: any;
}

export const SelectView = ({
  className,
  placeholder,
  field,
  form,
  options,
  defaultValue,
  isMulti = false,
}: ISelectView) => {
  const onChange = (option: any) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  return (
    <Select
      className={className}
      name={field.name}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      defaultValue={defaultValue}
    />
  );
};
