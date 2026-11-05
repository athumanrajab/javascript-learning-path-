import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //Throw error after a certain amount of time
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); //Throw error after a certain amount of time
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`${data.message} (${res.status})`);
//     }
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
// export const sendJSON = async function (url, uploadData) {
//   try {
//     // Send request by using fetch function
//     const res = await Promise.race([
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/JSON",
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(TIMEOUT_SEC),
//     ]); //Throw error after a certain amount of time
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(`${data.message} (${res.status})`);
//     }
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
