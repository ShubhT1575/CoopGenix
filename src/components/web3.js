import {
  getBalance,
  getToken,
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { ContractABI, ContractAddress, TokenABI } from "./Config";
import { config } from "../main";

export const checkAllowance = async (owner, TokenAddress) => {
  const result = await readContract(config, {
    abi: TokenABI,
    address: TokenAddress,
    functionName: "allowance",
    args: [owner, ContractAddress],
  });
  return Number(result);
};

export const tokenApprove = async (amt, TokenAddress, tokenDecimal) => {
  const result = await writeContract(config, {
    abi: TokenABI,
    address: TokenAddress,
    functionName: "approve",
    args: [
      ContractAddress,
      (amt * Number("1e" + tokenDecimal)).toLocaleString("fullwide", {
        useGrouping: false,
      }),
    ],
  });

  const receipt = await waitForTransactionReceipt(config, {
    hash: result,
  });
  return receipt;
};

export const buyPackage = async (ref, amt, tokenDecimal) => {
  console.log(ref, amt, tokenDecimal, ":::::buypackage");
  const result = await writeContract(config, {
    abi: ContractABI,
    address: ContractAddress,
    functionName: "joinPlan",
    args: [ref, (amt * Number("1e" + tokenDecimal)).toString()],
  });
  console.log(result, "result");
  const receipt = await waitForTransactionReceipt(config, {
    hash: result,
  });
  console.log(receipt, "receipt");
  return receipt;
};

export const registration = async (user, reff, amt) => {
  // console.log(ref, amt, tokenDecimal,":::::buypackage")
  const result = await writeContract(config, {
    abi: ContractABI,
    address: ContractAddress,
    functionName: "registration",
    args: [
      user,
      reff,
      (amt * 1e18).toLocaleString("fullwide", { useGrouping: false }),
    ],
  });
  console.log(result, "result");
  const receipt = waitForTransactionReceipt(config, {
    hash: result,
  });
  console.log(receipt, "receipt");
  return receipt;
};

export const UserExist = async (address) => {
  let result;
  try {
    result = await readContract(config, {
      abi: ContractABI,
      address: ContractAddress,
      functionName: "isUserExists",
      args: [address],
    });
    return result;
  } catch (error) {
    console.log("Error checking if user exists:", error);
    return false;
  }
};

export const UserData = async (address) => {
  let data;
  try {
    data = await readContract(config, {
      abi: ContractABI,
      address: ContractAddress,
      functionName: "users",
      args: [address],
    });
  } catch (error) {
    console.error("Error checking if Data is not fetch", error);
    data = null;
  }
  return data;
};

export const UpgradeAmount = async (amt, tokenDecimal) => {
  const result = await writeContract(config, {
    abi: ContractABI,
    address: ContractAddress,
    functionName: "upgradeLevel",
    args: [(amt * Number("1e" + tokenDecimal)).toString()],
  });

  const receipt = await waitForTransactionReceipt(config, {
    hash: result,
  });
  return receipt;
};

export const getOwner = async () => {
  const result = await readContract(config, {
    abi: ContractABI,
    address: ContractAddress,
    functionName: "owner",
    args: [],
  });
  return result;
};

export const LapseWallet = async (address) => {
  const result = await writeContract(config, {
    abi: ContractABI,
    address: ContractAddress,
    functionName: "setLapseWallet",
    args: [address],
  });

  const receipt = await waitForTransactionReceipt(config, {
    hash: result,
  });
  return receipt;
};

export const CurrentLapseAdd = async () => {
  const result = await readContract(config, {
    abi: ContractABI,
    address: ContractAddress,
    functionName: "lapseWallet",
    args: [],
  });
  return result;
};

export const getUSDT = async () => {
  try {
    const data = await readContract(config, {
      abi: ContractABI,
      address: ContractAddress,
      functionName: "VIN",
    });
    console.log(data, "data..............");

    const token = await getToken(config, {
      address: data,
    });
    return token;
  } catch (error) {
    console.error("Error checking if Data is not fetch", error);
  }
};

export function cutAfterDecimal(number, pos, dl, ac) {
  if (Number(number)) {
    if (dl) {
      const limit = dl?.decimalLimit[ac] > 0 ? dl?.decimalLimit[ac] : 5;
      const res =
        number?.toString()?.indexOf(".") > -1
          ? number
              .toString()
              .slice(0, number.toString().indexOf(".") + limit + 1)
          : number;
      return res;
    } else {
      const res =
        number?.toString()?.indexOf(".") > -1
          ? number.toString().slice(0, number.toString().indexOf(".") + pos + 1)
          : number;
      return res;
    }
  } else {
    return 0;
  }
}
