module.exports = {
  content: ['./components/**/*.{liquid,js}'],
  theme: {
    display: ['no-js'],
    extend: {
      spacing: {
        0.5: 'var(--size-0-5)', // 2px
        1: 'var(--size-1)', // 4px
        1.5: 'var(--size-1-5)', // 6px
        2: 'var(--size-2)', // 8px
        2.5: 'var(--size-2-5)', // 10px
        3: 'var(--size-3)', // 12px
        3.5: 'var(--size-3-5)', // 14px
        4: 'var(--size-4)', // 16px
        4.5: 'var(--size-4-5)', // 18px
        5: 'var(--size-5)', // 20px
        5.5: 'var(--size-5-5)', // 22px
        6: 'var(--size-6)', // 24px
        6.5: 'var(--size-6-5)', // 26px
        7: 'var(--size-7)', // 28px
        7.5: 'var(--size-7-5)', // 30px
        8: 'var(--size-8)', // 32px
        8.5: 'var(--size-8-5)', // 34px
        9: 'var(--size-9)', // 36px
        9.5: 'var(--size-9-5)', // 38px
        10: 'var(--size-10)', // 40px
        11: 'var(--size-11)', // 44px
        12: 'var(--size-12)', // 48px
        14: 'var(--size-14)', // 56px
        16: 'var(--size-16)', // 64px
        18: 'var(--size-18)', // 72px
        20: 'var(--size-20)', // 80px
        24: 'var(--size-24)', // 96px
        28: 'var(--size-28)', // 112px
        32: 'var(--size-32)' // 128px
      },
      aspectRatio: {
        landscape: '4 / 3',
        portrait: '2 / 3',
        wide: '16 / 9',
        natural: 'auto'
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      // This will apply styles when .no-js is present on <html>
      addVariant('no-js', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.no-js .${className}`
        })
      })
    }
  ]
}
