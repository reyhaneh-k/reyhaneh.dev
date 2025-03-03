import { useEffect, useState } from 'react';

export const useTypeWriter = (str: string) => {
  const [text, setText] = useState('|');
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText((text) =>
        text
          .slice(0, text.length - 1)
          .concat(str[index])
          .concat('|')
      );
      if (index >= str.length - 2) clearInterval(intervalId);
      index++;
    }, 30);

    return () => clearInterval(intervalId);
  }, [str]);
  return text;
};
