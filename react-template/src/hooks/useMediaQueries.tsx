import { useMediaQuery } from 'react-responsive';

export const useMediaQueriesMinWidth = () => {
  const isExtraLarge = useMediaQuery({ query: '(min-width: 1600px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 1280px)' });
  const isMedium = useMediaQuery({ query: '(min-width: 1100px)' });
  const isSmall = useMediaQuery({ query: '(min-width: 780px)' });
  const isExtraSmall = useMediaQuery({ query: '(min-width: 320px)' });

  return { isExtraLarge, isLarge, isMedium, isSmall, isExtraSmall };
};
