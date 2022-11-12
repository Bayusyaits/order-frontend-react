type Elevation = {
  shadow1: string
  shadow2: string
  shadow3: string
  shadow4: string
  [key: string]: string
}

const elevation: Elevation = {
  shadow1: '0px 0px 2px rgba(0, 0, 0, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.1)',
  shadow2: '0px 0px 2px rgba(0, 0, 0, 0.1), 1px 2px 4px rgba(0, 0, 0, 0.1)',
  shadow3: '0px 0px 2px rgba(0, 0, 0, 0.1), 2px 4px 8px rgba(0, 0, 0, 0.1)',
  shadow4: '0px 0px 2px rgba(0, 0, 0, 0.1), 4px 8px 12px rgba(0, 0, 0, 0.1)',
}

export default elevation
