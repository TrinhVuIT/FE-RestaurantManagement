import axios from '@axios'

const CONTROLLER_NAME = 'KhoaHoc'

const GetAll = async () => {
  const res = await axios.get(`${CONTROLLER_NAME}`)
  return res.data
}

const SearchAndPagination = async (params:any) => {
  const res = await axios.get(`${CONTROLLER_NAME}`,{params:params})
  return res.data
}

const AddItem = async (item:any) => {
  const res = await axios.post(`${CONTROLLER_NAME}`,item)
  return res.data
}
const EditItem = async (id:number,item:any) => {
  const res = await axios.put(`${CONTROLLER_NAME}/`+id,item)
  return res.data
}

const DeleteItem = async (id:number) => {
  const res = await axios.delete(`${CONTROLLER_NAME}/`+id)
  return res.data
}

const KhoaHocService = {
  GetAll,AddItem,EditItem,DeleteItem,SearchAndPagination
}

export default KhoaHocService
