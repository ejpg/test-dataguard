export interface PluginsResponse {
  tabs: string[]
  tabdata: { [key: string]: Tabdata }
  plugins: { [key: string]: Plugin }
}

export interface Plugin {
  title: string
  description: string
}

export interface Tabdata {
  title: string
  icon: string
  active: string[]
  disabled: string[]
  inactive: string[]
}
