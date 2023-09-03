/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
         sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        
       

    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'del': ['DELIRIUM NCV', 'sans-serif'],
      'script': ['Dancing Script', 'cursive'],
      'bai': ['DM Serif Display', 'serif'],

  },
      height:{
        'custom': '400px',
        'customs': '2px',
        'side': '650px',
        'display': '450px',
        'cover': '600px',


        
      },
      width:{
        'custom': '600px',
        
      },
   
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
}

