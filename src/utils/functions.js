// Форматировщики инпутов

export const formatNumberPhone = (srting) => {
  let res = srting.replace(/\D/g, '');
  const formats = [
    { length: 1, format: '+7' },
    { length: 4, format: '+7 ($2' },
    { length: 7, format: '+7 ($2) $3' },
    { length: 9, format: '+7 ($2) $3-$4' },
    { length: 11, format: '+7 ($2) $3-$4-$5' },
  ];

  for (const format of formats) {
    if (
      res.length <= format.length ||
      (res.length > 11 && format.length === 11)
    ) {
      const formattedInput = res.replace(
        /^(\d{0,1})(\d{1,3})(\d{0,3})(\d{0,2})(\d{0,2})(\d*)/,
        format.format
      );
      if (formattedInput !== res) {
        res = formattedInput;
        break;
      }
    }
  }
  return res;
};

export const formatFullName = (string) => {
  string = string.replace('  ', ' ').trimStart().split(' ').slice(0, 3);
  const res = string
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return res;
};

export const formatCategory = (category) => {
  const format = { BREAKFAST: 'Завтрак', LUNCH: 'Обед', SNACK: 'Полдник' };
  const res = format[category];
  return res;
};

// Загрузка картинки
export const loadImage = async (ico, func) => {
  const response = await fetch(ico);
  const blob = await response.blob();
  const list = response.url.split('/');
  const file = new File([blob], `${list[list.length - 1]}`, {
    type: `${blob.type}`,
  });

  func(file);
};

// Date --> string (YYYY-MM-DD)

export const dateToString = (date) => {
  const res = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  return res;
};
