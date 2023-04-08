export const validateString = (value: string, count: number) => {
  let error;
  switch (true) {
    case !value:
      error = 'Обязательное поле';
      break;
    case value.length < count:
      error = `Минимальное ко-во символов ${count}`;
      break;
  }

  return error;
};

export const validateArr = (value: string[]) => {
  let error;
  if (!value.length) {
    error = 'Обязательное поле';
  }

  return error;
};
