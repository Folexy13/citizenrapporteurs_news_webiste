import axios from "axios";

export function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function formatMessageTimestamp(timestamp) {
  if (!timestamp) return;
  const date = new Date(timestamp);
  return date.toLocaleTimeString().slice(0, 5);
}

export function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
// const getUniqueID = () => {
//   const s4 = () =>
//     Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   return s4() + s4() + "-" + s4();
// };
