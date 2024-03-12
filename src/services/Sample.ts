import axios from '@axios'

const CONTROLLER_NAME = 'Sample'

const GetAll = async (param: any) => {
  const res = await axios.get(`${CONTROLLER_NAME}/GetAll`, param)
  return res.data
}

const SampleService = {
  GetAll,
}

export default SampleService
