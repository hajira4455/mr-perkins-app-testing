const fs = require('fs')

const packageFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/package.json'
const envFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/.env'
const themeConfigFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/src/configs/themeConfig.js'
const useSkinHookFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/src/utility/hooks/useSkin.js'
const layoutReducerFilePath =
  '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/src/redux/reducers/layout/index.js'

let demo = 'demo-1'
const demoArgs = process.argv.slice(2)

if (demoArgs[0] !== undefined) {
  demo = demoArgs[0]
}

// Update Package.json File
if (fs.existsSync(packageFilePath)) {
  fs.readFile(packageFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      new RegExp(/("homepage":\s)("(.*)")/, 'g'),
      `$1"https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/${demo}/"`
    )

    fs.writeFile(packageFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Update .env file
if (fs.existsSync(envFilePath)) {
  fs.readFile(envFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      new RegExp(/(REACT_APP_BASENAME=\s*)("(.*)")/, 'g'),
      `$1"/demo/vuexy-react-admin-dashboard-template/${demo}"`
    )

    fs.writeFile(envFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Update useSkin hook for each demo skin
if (fs.existsSync(useSkinHookFilePath)) {
  fs.readFile(useSkinHookFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'),
      `$1vuexy-react-${demo}-skin$4`
    )

    fs.writeFile(useSkinHookFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Update layout reducer for menu collapsed localstorage for each demo
if (fs.existsSync(layoutReducerFilePath)) {
  fs.readFile(layoutReducerFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'),
      `$1vuexy-react-${demo}-menuCollapsed$4`
    )

    fs.writeFile(layoutReducerFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Replace themeConfig file
if (fs.existsSync(themeConfigFilePath)) {
  fs.copyFile(`./configs/${demo}/themeConfig.js`, themeConfigFilePath, err => {
    if (err) {
      return console.log(err)
    }
  })
}
