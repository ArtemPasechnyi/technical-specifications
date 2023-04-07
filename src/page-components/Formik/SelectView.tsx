import { FieldProps } from 'formik';
import Select from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface ISelectView extends FieldProps {
  options?: any;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const SelectView = ({
  className,
  placeholder,
  field,
  form,
  options,
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

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(
            (option: { value: any }) => field.value?.indexOf(option.value) >= 0
          )
        : options.find(
            (option: { value: any }) => option.value === field.value
          );
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      defaultValue={[options[2], options[3]]}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};
