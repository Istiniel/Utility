// import { WorkInputType } from './components/WorkSpace';

// const API_URL = 'http://185.244.172.108:8081';
// const { id: eID, rowName } = {
//   id: 52239,
//   rowName: '3bcf56cc-9508-4050-9b06-dfadb4b0ad01',
// };

// const getConfig = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

// const postConfig = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

// const deleteConfig = {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

// type ApiResponseType = {
//   changed: [Partial<WorkInputType>];
//   current: [Partial<WorkInputType>];
// };

// type ApiResponseGetListType = [
//   {
//     child: [Partial<WorkInputType>[]];
//     equipmentCosts: number;
//     estimatedProfit: number;
//     machineOperatorSalary: number;
//     mainCosts: number;
//     materials: number;
//     mimExploitation: number;
//     overheads: number;
//     parentId: number | null;
//     rowName: string;
//     salary: number;
//     supportCosts: number;
//     total?: number;
//   }
// ];

// type ApiSettingsType = {
//   getList: () => Promise<ApiResponseGetListType>;
//   createEntityRow: (body: Partial<WorkInputType>) => Promise<ApiResponseType>;
//   updateEntity: (rID: number, body: WorkInputType) => Promise<ApiResponseType>;
//   deleteRow: (rID: number) => Promise<ApiResponseType>;
// };

// const apiSettings: ApiSettingsType = {
//   getList: async () => {
//     const endpoint = API_URL + `/v1/outlay-rows/entity/${eID}/row/list`;
//     return await (await fetch(endpoint, getConfig)).json();
//   },

//   createEntityRow: async (bodyData) => {
//     const endpoint = API_URL + `/v1/outlay-rows/entity/${eID}/row/create`;
//     return await (
//       await fetch(endpoint, { ...postConfig, body: JSON.stringify(bodyData) })
//     ).json();
//   },

//   updateEntity: async (rID: number, bodyData) => {
//     const endpoint =
//       API_URL + `/v1/outlay-rows/entity/${eID}/row/${rID}/update`;
//     return await (
//       await fetch(endpoint, { ...postConfig, body: JSON.stringify(bodyData) })
//     ).json();
//   },

//   deleteRow: async (rID: number) => {
//     const endpoint =
//       API_URL + `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`;
//     return await (await fetch(endpoint, deleteConfig)).json();
//   },
// };

// export default apiSettings;
