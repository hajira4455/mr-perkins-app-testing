const fs = require('fs')

const packageFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/package.json'
const envFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/.env'
const themeConfigFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/src/configs/themeConfig.js'
const useSkinHookFilePath = '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/src/utility/hooks/useSkin.js'
const layoutReducerFilePath =
  '/Applications/XAMPP/htdocs/vuexy-admin/vuexy-react-template/src/redux/reducers/layout/index.js'

const demo = 'demo-1'

// Update package.json file
if (fs.existsSync(packageFilePath)) {
  fs.readFile(packageFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(new RegExp(/("homepage":\s)("(.*)")/, 'g'), '$1""')

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
    const result = data.replace(new RegExp(/(REACT_APP_BASENAME=\s*)("(.*)")/, 'g'), '$1""')

    fs.writeFile(envFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Reset useSkin hook
if (fs.existsSync(useSkinHookFilePath)) {
  fs.readFile(useSkinHookFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'), `$1skin$4`)

    fs.writeFile(useSkinHookFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Reset layout reducer for menuCollapsed localstorage
if (fs.existsSync(layoutReducerFilePath)) {
  fs.readFile(layoutReducerFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'), `$1menuCollapsed$4`)

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
