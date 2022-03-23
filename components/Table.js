// function App() {
//     const columns = React.useMemo(
//       () => [
//         {
//           Header: 'Info',
//           columns: [
//             {
//               Header: 'Age',
//               accessor: 'age',
//             },
//             {
//               Header: 'Visits',
//               accessor: 'visits',
//             },
//             {
//               Header: 'Status',
//               accessor: 'status',
//             },
//             {
//               Header: 'Profile Progress',
//               accessor: 'progress',
//             },
//           ],
//         },
//       ],
//       []
//     )

//     const data = React.useMemo(() => makeData(20), [])

//     return (
//       <Styles>
//         <Table columns={columns} data={data} />
//       </Styles>
//     )
//   }

//   export default App
