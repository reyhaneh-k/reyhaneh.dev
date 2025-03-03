import { useEffect, useRef, useState } from 'react';

// export const useTypeWriter = (str: string) => {
//   const [text, setText] = useState('');
//   useEffect(() => {
//     let index = 0;
//     const intervalId = setInterval(() => {
//       if (index <= str.length - 1) {
//         setText((text) => text.concat(str[index]));
//         index++;
//       } else {
//         clearInterval(intervalId);
//       }
//     }, 60);

//     return () => clearInterval(intervalId);
//   }, [str]);

//   return text;
// };
export const useTypeWriter = (str: string) => {
  const text = useRef('|');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let timeOutId: NodeJS.Timeout | undefined = undefined;
    if (index < str.length) {
      timeOutId = setTimeout(() => {
        text.current = text.current.slice(0, text.current.length - 1);
        text.current += str[index] + '|';
        setIndex((index) => index + 1);
      }, 50);
    } else {
      clearTimeout(timeOutId);
    }
    return () => clearTimeout(timeOutId);
  }, [index, str]);
  return text.current;
};
