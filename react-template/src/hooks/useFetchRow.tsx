// import React, { useCallback, useEffect, useState } from 'react';
// import { WorkInputType } from '../components/WorkSpace';
// import apiSettings from '../API';
// import { useUpdateRows } from './useUpdateRows';

// type UseFetchRowType = (
//   costsRow: Partial<WorkInputType> | null,
//   updateRow: any
// ) => {};

// const useFetchRow: UseFetchRowType = (costsRow, updateRow) => {
//   const [newRow, setNewRow] = useState<Partial<WorkInputType> | null>(null);

//   let createRow = useCallback(async () => {
//     try {
//       let row = await apiSettings.createEntityRow(costsRow!);
//       setNewRow(row.changed[0]);
//       updateRow(row.changed[0]);
//       console.log(JSON.stringify(newRow) + 'fetched');
//     } catch (error) {
//       console.log('Something got wrong');
//     }
//   }, [costsRow]);

//   useEffect(() => {
//     if (!!costsRow) {
//       createRow();
//     }
//   }, [createRow, costsRow]);

//   return { newRow };
// };

// export default useFetchRow;
