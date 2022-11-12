export const device = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  fourK: '2560px',
}

export const breakpoint = {
  mobileS: `(max-width: ${device.mobileS})`,
  mobileM: `(max-width: ${device.mobileM})`,
  mobileL: `(max-width: ${device.mobileL})`,
  tablet: `(max-width: ${device.tablet})`,
  laptop: `(max-width: ${device.laptop})`,
  laptopL: `(max-width: ${device.laptopL})`,
  fourK: `(max-width: ${device.fourK})`,
}
