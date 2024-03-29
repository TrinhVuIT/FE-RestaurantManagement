import axios from "@axios";

const CONTROLLER_NAME = "/api/Food";

const GetPaged = async (param: any) => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetPage`, param);
  return res.data;
};

const GetById = async (id: number) => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetById?id=${id}`);
  return res.data;
};

const CreateNew = async (param: any) => {
  const res = await axios.post(`${CONTROLLER_NAME}/CreateNew`, param);
  return res.data;
};

const Update = async (id: number, param: any) => {
  const res = await axios.put(`${CONTROLLER_NAME}/Update?id=${id}`, param);
  return res.data;
};

const Delete = async (id: number) => {
  const res = await axios.delete(`${CONTROLLER_NAME}/Delete?id=${id}`);
  return res.data;
};

const FoodService = {
  GetPaged,
  GetById,
  CreateNew,
  Update,
  Delete,
};

export default FoodService;
