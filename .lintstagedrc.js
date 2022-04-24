module.exports = {
   '*.{ts,tsx}': [
     () => 'tsc --skipLibCheck --noEmit',
     'eslint',
   ],
   '*.{js,mjs}': [
     'eslint',
   ],
 };
