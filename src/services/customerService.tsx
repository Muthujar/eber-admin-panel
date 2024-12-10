import { message } from "antd";
import apiBs from "./apiBs";
import apiClient from "./apiClient";
import axios, { AxiosResponse } from "axios";
export const fetchCustomerList = async (params: {
  page?: number;
  limit?: number;
  display_name?: string;
}) => {
  const response = await apiClient.get("/business/list/user", { params });
  return response.data;
};

export const fetchCustomerDetails = async (query: {
  email?: string;
  phone?: string;
}) => {
  const response = await apiClient.get("/integration/user/show", {
    params: query,
  });
  return response.data;
};

export const postPurchaseDetails = async (body: {}, query: {}) => {
  try {
    const response = await apiClient.post("integration/issue_point", body, {
      params: query,
    });
    return response.data;
  } catch (error: any) {
    console.log(error);

    if (error.response) {
    }

    // Extract and handle specific errors
    if (error.response?.data) {
      const errorData = error.response.data;

      // Check for validation error
      if (errorData.errorDetails?.error_type) {
        const validationErrors = errorData.errorDetails.error;
        const formattedErrors = Object.entries(validationErrors)
          .map(([field, messages]: any) => `${field}: ${messages.join(", ")}`)
          .join("; ");

        console.error("Validation Error:", formattedErrors);
        message.error(formattedErrors);
        throw new Error(`Validation failed: ${formattedErrors}`);
      }

      // General API error
      throw new Error(
        errorData.message || "An error occurred while creating the customer."
      );
    }

    // Fallback error message
    throw new Error(error.message || "Unknown error occurred.");
  }
};

export const redeemRewards = async (body: {}, query: {}) => {
  const response = await apiClient.post("integration/redeem", body, {
    params: query,
  });
  return response.data;
};

export const voidTransaction = async (body: {}, query: {}) => {
  try {
    const response = await apiClient.post(
      "integration/point_transaction/void",
      body,
      { params: query }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      const errorData = error.response.data;

      // Check for validation error
      if (errorData.errorDetails?.error_type) {
        const validationErrors = errorData.errorDetails.error;
        const formattedErrors = Object.entries(validationErrors)
          .map(([field, messages]: any) => `${field}: ${messages.join(", ")}`)
          .join("; ");

        console.error("Validation Error:", formattedErrors);
        message.error(formattedErrors);
        throw new Error(`Validation failed: ${formattedErrors}`);
      }

      // General API error
      throw new Error(
        errorData.message || "An error occurred while creating the customer."
      );
    }

    // Fallback error message
    throw new Error(error.message || "Unknown error occurred.");
  }
};

export const adjustPointsCus = async (body: {}) => {
  try {
    const response = await apiClient.post(
      "point/adjust",
      body
      // { params: query }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      const errorData = error.response.data;

      // Check for validation error
      if (errorData.errorDetails?.error_type) {
        const validationErrors = errorData.errorDetails.error;
        const formattedErrors = Object.entries(validationErrors)
          .map(([field, messages]: any) => `${field}: ${messages.join(", ")}`)
          .join("; ");

        console.error("Validation Error:", formattedErrors);
        message.error(formattedErrors);
        throw new Error(`Validation failed: ${formattedErrors}`);
      }

      // General API error
      throw new Error(
        errorData.message || "An error occurred while creating the customer."
      );
    }

    // Fallback error message
    throw new Error(error.message || "Unknown error occurred.");
  }
};

export const getTransactions = async (params: {
  page?: number;
  limit?: number;
  display_name?: string;
}) => {
  const response = await apiClient.get("integration/point_transaction", {
    params,
  });
  return response.data;
};

export const getBsTransactions = async (params: {
  // page?: number;
  // limit?: number;
  // cust_name?: string;
}) => {
  const response = await apiBs.get("transactionhistory", {
    params,
  });
  return response.data;
};

export const getBsCustomer = async (params: any) => {
  console.log(params);
  // const response = await apiBs.get("https://mydemov2.beautecloud.com/be/api/custappt",{params});
  const response = await apiBs.get("custappt/", { params });

  return response.data;
};

// export const  createEberCustomer = async (body:{}

// ) => {
//   // const response = await apiBs.get("https://mydemov2.beautecloud.com/be/api/custappt",{params});
//   const response = await apiClient.post("integration/user/create",body);

//   return response.data;
// };

// export const createEberCustomer = async (
//   body: Record<string, any>
// ): Promise<any> => {
//   try {
//     const response: AxiosResponse = await apiClient.post(
//       "integration/user/create",
//       body
//     );
//     return response.data;
//   } catch (error: any) {
//     console.log(error);
//     console.error(
//       "Error creating Eber customer:",
//       error?.response?.data || error.message
//     );
//     throw new Error(
//       error?.response?.data?.message || "Failed to create Eber customer"
//     );
//   }
// };

export const createEberCustomer = async (
  body: Record<string, any>
): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.post(
      "integration/user/create",
      body
    );
    return response.data;
  } catch (error: any) {
    console.log(error);

    // Extract and handle specific errors
    if (error.response?.data) {
      const errorData = error.response.data;

      // Check for validation error
      if (errorData.errorDetails?.error_type) {
        const validationErrors = errorData.errorDetails.error;
        const formattedErrors = Object.entries(validationErrors)
          .map(([field, messages]: any) => `${field}: ${messages.join(", ")}`)
          .join("; ");

        console.error("Validation Error:", formattedErrors);
        message.error(formattedErrors);
        throw new Error(`Validation failed: ${formattedErrors}`);
      }

      // General API error
      throw new Error(
        errorData.message || "An error occurred while creating the customer."
      );
    }

    // Fallback error message
    throw new Error(error.message || "Unknown error occurred.");
  }
};
