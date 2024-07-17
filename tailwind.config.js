import { addDynamicIconSelectors } from '@iconify/tailwind';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    backgroundImage: {
      'city-street': "url('https://ychef.files.bbci.co.uk/1280x720/p0gtwr8t.jpg')",
      'book-shelves': "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D')",
    },
    fontFamily: {
      'lato': ['"Lato"', 'sans-serif'],
    },
  },
};
export const plugins = [
  addDynamicIconSelectors(),
];

