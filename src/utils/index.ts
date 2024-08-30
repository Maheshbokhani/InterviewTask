import dayjs from 'dayjs';

export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const onChangeEmail = text => {
  if (text.length === 0) {
    return text;
  }
  const formattedText = text.charAt(0).toLowerCase() + text.slice(1);
  return formattedText;
};

export const getMonthWithYear = date => {
  if (!date) {
    return dayjs().format('MMM YYYY');
  }
  return dayjs(date).format('MMM YYYY');
};

export const countItemsByMonth = items => {
  const counts = {};

  items?.forEach(item => {
    const date = dayjs(item.updated_date).format('MMM');

    const key = `${date}`;

    if (counts[key]) {
      counts[key] += 1;
    } else {
      counts[key] = 1;
    }
  });

  return counts;
};

export const getItemsByMonth = (items, month) => {
  const newItemList = items?.filter(item => {
    const date = dayjs(item.updated_date).format('MMM');
    if (date === month) {
      return true;
    }
    return false;
  });
  return newItemList;
};
