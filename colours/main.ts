export const main = (theme) => {
  const colours = (() => {
    switch (theme) {
      case 'primary':
        return {
          border: 'border-primary-500',
          borderLight: 'border-primary-50',
          borderDark: 'border-primary-900',

          ring: 'ring-primary-500',
          ringLight: 'ring-primary-50',
          ringDark: 'ring-primary-900',

          divide: 'divide-primary-500',

          text: 'text-primary-500',
          textLight: 'text-primary-50',
          textDark: 'text-primary-900',

          bg: 'bg-primary-500',
          bgLight: 'bg-primary-50',
          bgDark: 'bg-primary-900',

          borderHover: 'hover:border-primary-500',
          borderLightHover: 'hover:border-primary-50',
          borderDarkHover: 'hover:border-primary-900',

          textHover: 'hover:text-primary-500',
          textLightHover: 'hover:text-primary-50',
          textDarkHover: 'hover:text-primary-900',

          bgHover: 'hover:bg-primary-500',
          bgLightHover: 'hover:bg-primary-50',
          bgDarkHover: 'hover:bg-primary-900'
        }

      case 'secondary':
        return {
          border: 'border-secondary-500',
          borderLight: 'border-secondary-50',
          borderDark: 'border-secondary-900',

          ring: 'ring-secondary-500',
          ringLight: 'ring-secondary-50',
          ringDark: 'ring-secondary-900',

          text: 'text-secondary-500',
          textLight: 'text-secondary-50',
          textDark: 'text-secondary-900',

          divide: 'divide-secondary-500',

          bg: 'bg-secondary-500',
          bgLight: 'bg-secondary-50',
          bgDark: 'bg-secondary-900',

          borderHover: 'hover:border-secondary-500',
          borderLightHover: 'hover:border-secondary-50',
          borderDarkHover: 'hover:border-secondary-900',

          textHover: 'hover:text-secondary-500',
          textLightHover: 'hover:text-secondary-50',
          textDarkHover: 'hover:text-secondary-900',

          bgHover: 'hover:bg-secondary-500',
          bgLightHover: 'hover:bg-secondary-50',
          bgDarkHover: 'hover:bg-secondary-900'
        }
      case 'accent':
        return {
          border: 'border-accent-500',
          borderLight: 'border-accent-50',
          borderDark: 'border-accent-900',

          ring: 'ring-primary-500',
          ringLight: 'ring-primary-50',
          ringDark: 'ring-primary-900',

          text: 'text-accent-500',
          textLight: 'text-accent-50',
          textDark: 'text-accent-900',

          bg: 'bg-accent-500',
          bgLight: 'bg-accent-50',
          bgDark: 'bg-accent-900',

          borderHover: 'hover:border-accent-500',
          borderLightHover: 'hover:border-accent-50',
          borderDarkHover: 'hover:border-accent-900',

          textHover: 'hover:text-accent-500',
          textLightHover: 'hover:text-accent-50',
          textDarkHover: 'hover:text-accent-900',

          bgHover: 'hover:bg-accent-500',
          bgLightHover: 'hover:bg-accent-50',
          bgDarkHover: 'hover:bg-accent-900'
        }
    }
  })()

  return {
    panel: `bg-white ${colours.border} ${colours.text}`,
    header: `${colours.bg} text-white`,
    item: `bg-white ${colours.textDark}`,
    ...colours
  }
}
