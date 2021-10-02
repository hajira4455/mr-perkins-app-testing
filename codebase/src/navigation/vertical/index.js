// ** Navigation sections imports
import dashboards from './dashboards'
import clients from './clients'
import orders from './orders'
import products from './products'
import news from './news'
import contact from './contact'

// ** Merge & Export
export default [
  ...dashboards,
  ...clients,
  ...orders,
  ...products,
  ...news,
  ...contact
  // ...apps,
  // ...uiElements,
  // ...formsAndTables,
  // ...pages,
  // ...chartsAndMaps,
  // ...others
]
