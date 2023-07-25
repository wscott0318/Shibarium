import React from "react";
import axios from "axios";
import { API_BASE_URL } from "app/config/constant";

const headers = {
  "Content-Type": "application/json",
  mode: "cors",
};
const postTransactions = async (body: any) => {
  try {
    console.log("post body ", body);
    let response = await axios.post(`${API_BASE_URL}/transactions`, body, {
      headers: headers,
    });
    return response;
  } catch (err) {
    return {};
  }
};

export const putTransactions = async (body: any) => {
  try {
    console.log("post body ", body);
    let response = await axios.put(`${API_BASE_URL}/transactions`, body, {
      headers: headers,
    });
    return response;
  } catch (err) {
    return {};
  }
};

export const getTransactions = async (account: any) => {
  try {
    let response = await axios.get(
      `${API_BASE_URL}/transactions/getTransactions?walletAddress=${account}`,
      {
        headers: headers,
      }
    );
    return response?.data?.data;
  } catch (err) {
    return null;
  }
};

export default postTransactions;
