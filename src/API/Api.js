import axios from "axios";
import { apiUrl } from "../components/Config";

export function getAmPm(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  return hours >= 12 ? "PM" : "AM";
}

export function formatTime(time) {
  return time <= 9 ? "0" + time : time;
}

export const getUser = async (address) => {
  try {
    const response = await axios.get(apiUrl + "/user-info", {
      params: {
        address: address,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export const getAddressbyRefrralId = async (referralId) => {
  try {
    const response = await axios.get(apiUrl + "/getAddressbyRefrralId", {
      params: {
        referralId: referralId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching Referral ID:", error.message);
  }
};

export const globalSelectPoolList = async () => {
  try {
    const response = await axios.get(apiUrl + "/globalSelectPoolList", {});
    return response;
  } catch (error) {
    console.error("Error fetching globalSelectPoolList:", error.message);
  }
};

export const globalPoolData = async (address, pool) => {
  try {
    const response = await axios.get(apiUrl + "/globalPoolData", {
      params: {
        address: address,
        pool: pool,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching globalPoolData:", error.message);
  }
};

export const getTicketList = async (address, page) => {
  try {
    const response = await axios.post(apiUrl + "/tickets-list", {
      address: address,
      page: page,
      limit: 10,
    });
    return response;
  } catch (error) {
    console.error("Error fetching getTicketList:", error.message);
  }
};

export function raiseTicket(address, name, subject, message, queryfile) {
  const formData = new FormData();
  if (queryfile) {
    formData.append("query", queryfile, queryfile.name);
  }
  formData.append("address", address);
  formData.append("name", name);
  formData.append("subject", subject);
  formData.append("message", message);

  return axios
    .post(apiUrl + "/raise-ticket", formData, {})
    .then((res) => res)
    .catch((e) => {
      console.log(e);
    });
}

// export function getTicketList(address, page) {
//   return fetch(apiUrl + "/tickets-list", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "allow-access-control-origin": "*",
//     },
//     body: JSON.stringify({
//       address: address,
//       page: page,
//       limit: 10,
//     }),
//   })
//     .then((res) => res.json())
//     .catch((e) => {
//       console.log(e, "Error in getTicketList()::apis.tsx");
//     });
// }
