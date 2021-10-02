// ** Routes Imports
import UsedRoutes from './UsedRoutes'
import Forms from './Forms'
// ** Document title
const TemplateTitle = '%s -Mr Perkins Web Store'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [...UsedRoutes, ...Forms]

export { DefaultRoute, TemplateTitle, Routes }
