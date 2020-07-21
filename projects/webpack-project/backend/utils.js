// export function success() {
//   return {
//     success: true,
//     data: {}
//   }
// }
exports.success = data => {
  return {
    success: true,
    data: data
  };
};

exports.failed = info => {
  return {
    success: false,
    info
  };
};