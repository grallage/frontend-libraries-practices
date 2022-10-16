import { useEffect, useState } from 'react'

const useMediaQuery = (
  query: string,
  whenTrue: any = true,
  whenFalse: any = false
) => {
  const isSupportMediaQuery = !(
    typeof window === 'undefined' || typeof window.matchMedia === 'undefined'
  )

  const mediaQuery = isSupportMediaQuery ? window.matchMedia(query) : null
  const [match, setMatch] = useState(mediaQuery?.matches ?? false)

  useEffect(() => {
    if (isSupportMediaQuery && mediaQuery) {
      const handler = () => setMatch(!!mediaQuery.matches)
      //   mediaQuery.addListener(handler)
      //   return () => mediaQuery.removeListener(handler)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  return match ? whenTrue : whenFalse
}

export default useMediaQuery

// export const useMediaQuery = (query) => {
//   const mediaMatch = window.matchMedia(query);
//   const [matches, setMatches] = useState(mediaMatch.matches);

//   useEffect(() => {
//     const handler = e => setMatches(e.matches);
//     mediaMatch.addListener(handler);
//     return () => mediaMatch.removeListener(handler);
//   });
//   return matches;
// };

// const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

//   try {
//     // Chrome & Firefox
//     darkMediaQuery.addEventListener('change', (e) => {
//       this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
//     });
//   } catch (e1) {
//     try {
//       // Safari
//       darkMediaQuery.addListener((e) => {
//         this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
//       });
//     } catch (e2) {
//       console.error(e2);
//     }
//   }
