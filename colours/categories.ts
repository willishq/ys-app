export const categories = (slug):ColourTheme => {
  const colours = (() => {
    switch (slug) {
      case 'mental-health-and-wellbeing':
        return {
          bg: 'bg-categories-mental-health-and-wellbeing/30',
          bgDark: 'bg-categories-mental-health-and-wellbeing',
          text: 'text-categories-mental-health-and-wellbeing',
          border: 'border-categories-mental-health-and-wellbeing',
          divide: 'divide-categories-mental-health-and-wellbeing',
          hoverBg: 'hover:bg-categories-mental-health-and-wellbeing',
          hoverLightBg: 'hover:bg-categories-mental-health-and-wellbeing/10',
          hoverText: 'hover:text-categories-mental-health-and-wellbeing'
        }
      case 'behavioural-support':
        return {
          bg: 'bg-categories-behavioural-support/30',
          bgDark: 'bg-categories-behavioural-support',
          text: 'text-categories-behavioural-support',
          border: 'border-categories-behavioural-support',
          divide: 'divide-categories-behavioural-support',
          hoverBg: 'hover:bg-categories-behavioural-support',
          hoverLightBg: 'hover:bg-categories-behavioural-support/10',
          hoverText: 'hover:text-categories-behavioural-support'
        }
      case 'addiction-support':
        return {
          bg: 'bg-categories-addiction-support/30',
          bgDark: 'bg-categories-addiction-support',
          text: 'text-categories-addiction-support',
          border: 'border-categories-addiction-support',
          divide: 'divide-categories-addiction-support',
          hoverBg: 'hover:bg-categories-addiction-support',
          hoverLightBg: 'hover:bg-categories-addiction-support/10',
          hoverText: 'hover:text-categories-addiction-support'
        }
      case 'child-protection-and-wellness':
        return {
          bg: 'bg-categories-child-protection-and-wellness/30',
          bgDark: 'bg-categories-child-protection-and-wellness',
          text: 'text-categories-child-protection-and-wellness',
          border: 'border-categories-child-protection-and-wellness',
          divide: 'divide-categories-child-protection-and-wellness',
          hoverBg: 'hover:bg-categories-child-protection-and-wellness',
          hoverLightBg: 'hover:bg-categories-child-protection-and-wellness/10',
          hoverText: 'hover:text-categories-child-protection-and-wellness'
        }
      case 'digital-wellness':
        return {
          bg: 'bg-categories-digital-wellness/30',
          bgDark: 'bg-categories-digital-wellness',
          text: 'text-categories-digital-wellness',
          border: 'border-categories-digital-wellness',
          divide: 'divide-categories-digital-wellness',
          hoverBg: 'hover:bg-categories-digital-wellness',
          hoverLightBg: 'hover:bg-categories-digital-wellness/10',
          hoverText: 'hover:text-categories-digital-wellness'
        }
      case 'relationships-and-sexual-health':
        return {
          bg: 'bg-categories-relationships-and-sexual-health/30',
          bgDark: 'bg-categories-relationships-and-sexual-health',
          text: 'text-categories-relationships-and-sexual-health',
          border: 'border-categories-relationships-and-sexual-health',
          divide: 'divide-categories-relationships-and-sexual-health',
          hoverBg: 'hover:bg-categories-relationships-and-sexual-health',
          hoverLightBg: 'hover:bg-categories-relationships-and-sexual-health/10',
          hoverText: 'hover:text-categories-relationships-and-sexual-health'
        }
      case 'physical-health':
        return {
          bg: 'bg-categories-physical-health/30',
          bgDark: 'bg-categories-physical-health',
          text: 'text-categories-physical-health',
          border: 'border-categories-physical-health',
          divide: 'divide-categories-physical-health',
          hoverBg: 'hover:bg-categories-physical-health',
          hoverLightBg: 'hover:bg-categories-physical-health/10',
          hoverText: 'hover:text-categories-physical-health'
        }
      case 'housing-and-homelessness':
        return {
          bg: 'bg-categories-housing-and-homelessness/30',
          bgDark: 'bg-categories-housing-and-homelessness',
          text: 'text-categories-housing-and-homelessness',
          border: 'border-categories-housing-and-homelessness',
          divide: 'divide-categories-housing-and-homelessness',
          hoverBg: 'hover:bg-categories-housing-and-homelessness',
          hoverLightBg: 'hover:bg-categories-housing-and-homelessness/10',
          hoverText: 'hover:text-categories-housing-and-homelessness'
        }
      case 'education-and-employment':
        return {
          bg: 'bg-categories-education-and-employment/30',
          bgDark: 'bg-categories-education-and-employment',
          text: 'text-categories-education-and-employment',
          border: 'border-categories-education-and-employment',
          ring: 'ring-categories-education-and-employment/30',
          divide: 'divide-categories-education-and-employment',
          hoverBg: 'hover:bg-categories-education-and-employment',
          hoverLightBg: 'hover:bg-categories-education-and-employment/10',
          hoverText: 'hover:text-categories-education-and-employment'
        }
      case 'social-care-and-community-support':
        return {
          bg: 'bg-categories-social-care-and-community-support/30',
          bgDark: 'bg-categories-social-care-and-community-support',
          text: 'text-categories-social-care-and-community-support',
          border: 'border-categories-social-care-and-community-support',
          ring: 'ring-categories-social-care-and-community-support/30',
          divide: 'divide-categories-social-care-and-community-support',
          hoverBg: 'hover:bg-categories-social-care-and-community-support',
          hoverLightBg: 'hover:bg-categories-social-care-and-community-support/10',
          hoverText: 'hover:text-categories-social-care-and-community-support'
        }
      case 'therapies':
        return {
          bg: 'bg-categories-therapies/30',
          bgDark: 'bg-categories-therapies',
          text: 'text-categories-therapies',
          border: 'border-categories-therapies',
          ring: 'ring-categories-therapies/30',
          divide: 'divide-categories-therapies',
          hoverBg: 'hover:bg-categories-therapies',
          hoverLightBg: 'hover:bg-categories-therapies/10',
          hoverText: 'hover:text-categories-therapies'
        }
      case 'financial-support':
        return {
          bg: 'bg-categories-financial-support/30',
          bgDark: 'bg-categories-financial-support',
          text: 'text-categories-financial-support',
          border: 'border-categories-financial-support',
          ring: 'ring-categories-financial-support/30',
          divide: 'divide-categories-financial-support',
          hoverBg: 'hover:bg-categories-financial-support',
          hoverLightBg: 'hover:bg-categories-financial-support/10',
          hoverText: 'hover:text-categories-financial-support'
        }
      case 'legal-support':
        return {
          bg: 'bg-categories-legal-support/30',
          bgDark: 'bg-categories-legal-support',
          text: 'text-categories-legal-support',
          border: 'border-categories-legal-support',
          ring: 'ring-categories-legal-support/30',
          divide: 'divide-categories-legal-support',
          hoverBg: 'hover:bg-categories-legal-support',
          hoverLightBg: 'hover:bg-categories-legal-support/10',
          hoverText: 'hover:text-categories-legal-support'
        }
      default:
        return {
          bg: 'bg-neutral-100',
          bgDark: 'bg-neutral-700',
          text: 'text-neutral-700',
          border: 'border-neutral-700',
          ring: 'ring-neutral-700/30',
          divide: 'divide-neutral-700',
          hoverBg: 'hover:bg-neutral-700',
          hoverLightBg: 'hover:bg-neutral-100',
          hoverText: 'bg-neutral-700 hover:text-neutral-700'
        }
    }
  })()

  return {
    bg: colours.bg,
    bgDark: `text-white ${colours.bgDark}`,
    text: colours.text,
    border: colours.border,
    ring: colours.ring,
    divide: colours.divide,
    button: `bg-white ${colours.text} ${colours.hoverBg} border ${colours.border} hover:text-white hover:text-underline select-none cursor-pointer`,
    buttonReverse: `text-white ${colours.bgDark} ${colours.hoverText} border ${colours.border} hover:bg-white hover:text-underline select-none cursor-pointer`,
    hoverBg: colours.hoverBg,
    hoverBgDark: `hover:text-white ${colours.hoverBg}`,
    hoverText: colours.hoverText,
    hoverLightBg: colours.hoverLightBg
  }
}
