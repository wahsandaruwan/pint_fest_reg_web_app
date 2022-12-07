import DataTable from "react-data-table-component";

const Details = () => {
  // Table columns
  const columns = [
    {
      name: "Service ID",
      selector: (row) => row.customerJobId,
    },
    {
      name: "Customer ID",
      selector: (row) => row.customerId,
    },
    // {
    //   name: "Website ID",
    //   selector: (row) => row.customerWebsiteId,
    // },
    {
      name: "Designer ID",
      selector: (row) => row.designerId,
    },
    {
      name: "Job Status",
      selector: (row) => row.customerJobStatus,
    },
    {
      name: "View",
      cell: (row) => (
        <button
          className="table-edit-btn"
          onClick={() => {
            setShowServiceBody(true);
            console.log(row);
            setEditData(row);
          }}
        >
          View
        </button>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="table-edit-btn"
          onClick={() => {
            setShowModal(true);
            setEditData(row);
          }}
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="table-delete-btn"
          onClick={() => deleteCustomerJobs(row.customerJobId)}
        >
          Delete
        </button>
      ),
    },
  ];
  // Custom styles
  const newStyle = {
    rows: {
      style: {
        fontSize: "0.9rem",
      },
    },
    headCells: {
      style: {
        fontSize: "0.9rem",
        color: "var(--main-light)",
        backgroundColor: "var(--main-dark)",
      },
    },
  };
  return (
    <>
      <div className="reg-details">
        <div className="data-table">
          <DataTable
            columns={columns}
            data={data}
            pagination
            fixedHeader
            highlightOnHover
            customStyles={newStyle}
          />
        </div>
      </div>
    </>
  );
};
export default Details;
