import { get, post } from "./RestClient";
export interface StateListParam {
  limit?: number;
  //  page: number;
  controllingfieldfk?: any
  fieldName?: any;
  sort?: object;
  offset?: number;
}
export interface CenterListParam {
  limit?: number;

  filters?: any;
  offset?: number;
}
export const getStateBlockDistrictList = async ({
  controllingfieldfk,
  fieldName,
}: {
  controllingfieldfk?: string;
  fieldName: string;
}): Promise<any> => {
  const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/fields/options/read`;
  try {
    const requestBody: { fieldName: string; controllingfieldfk?: string } = { fieldName };

    if (controllingfieldfk) {
      requestBody.controllingfieldfk = controllingfieldfk;
    }

    const response = await post(apiUrl, requestBody);
    return response?.data;
  } catch (error) {
    console.error("error in fetching user details", error);
    return error;
  }
};

export const getDistrictsForState = async ({
  controllingfieldfk,
  fieldName,
}: {
  controllingfieldfk: string;
  fieldName: string;
}): Promise<any> => {
  const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/fields/options/read`;
  try {
    const response = await post(apiUrl, {
      controllingfieldfk,
      fieldName,
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching district data", error);
    return error;
  }
};

export const getBlocksForDistricts = async ({
  controllingfieldfk,
  fieldName,
}: {
  controllingfieldfk: string;
  fieldName: string;
}): Promise<any> => {
  const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/fields/options/read`;
  try {
    const response = await post(apiUrl, {
      controllingfieldfk,
      fieldName,
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching district data", error);
    return error;
  }
};

export const getCenterList = async ({
  filters,
  limit,
  offset,
}: CenterListParam): Promise<any> => {
  const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/cohort/search`;
  try {
    const response = await post(apiUrl, {
      filters,
      limit,
      offset,
    });
    return response?.data;
  } catch (error) {
    console.error("error in fetching user details", error);
    return error;
  }
};
