// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => {
  // localStorage.getItem('userData')
  return false;
};
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return "/";
  if (userRole === "client") return "/access-control";
  return "/login";
};

export const numberFormat = (value) =>
  value !== 0 ? new Intl.NumberFormat().format(value) : 0.0;

export const numberFormat2 = (value) =>
  value !== 0 ? new Intl.NumberFormat("de-DE").format(value) : 0.0;
// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});
export const formatToNumber = (value) => {
  //return parseFloat(value.split('S/')[1].replace(/,/g, ''))//
  const newValue = value.replace("S/", "");
  return parseFloat(newValue.replace("$", ""));
};
export const calculateTotalnteger = (elements) => {
  if (!elements) return [];

  const hasProductPrice = elements.every((element) => element.productPrice);
  if (hasProductPrice === false) return 0;

  const total = elements.reduce(
    (acc, curr) => acc + formatToNumber(curr.productPrice),
    0
  );
  return total;
};
export const transformPacking = (packing) => {
  let count = 1;
  switch (packing) {
    case "Caja x 24":
      count = 24;
      break;
    case "Caja x 24 (En 4pack)":
      count = 24;
      break;
    case "Fourpacks":
      count = 4;
      break;
    case "Botellas":
      count = 1;
      break;
    case "Unidades":
      count = 1;
      break;
    default:
      count = 1;
      break;
  }
  return count;
};
