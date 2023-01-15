
function Dashboard({ title }) {
  return (
    <>
      <div className="container mt-2 rounded-1">
        <div className="row">
          <h2 className="titleContent p-2 text-white rounded-2">{title}</h2>

          <div className="col-md-6">
            <div className="card m-1 purchase-card rounded-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-cash-register fs-1 bg-success p-3 rounded-5 text-white"></i>
                <h5 className="card-title mt-1">Purchase</h5>
                <h3 className="fs-3">
                  $Amount
                  <i className="fa-solid fa-caret-up text-success p-1 fs-3"></i>
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card m-1 sales-card rounded-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-hand-holding-dollar fs-1 bg-info p-3 rounded-5 text-white"></i>
                <h5 className="card-title mt-1">Sales</h5>
                <h3 className="fs-3">
                  $Amount
                  <i className="fa-solid fa-caret-up text-primary p-1 fs-3"></i>
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card m-1 delivery-card rounded-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-truck-fast fs-1 bg-warning p-3 rounded-5 text-dark"></i>
                <h5 className="card-title mt-1">Deliverys</h5>
                <h3 className="fs-3">
                  Count
                  <i className="fa-solid fa-caret-up text-primary p-1 fs-3"></i>
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card m-1 pedidos-card rounded-4 text-white">
              <div className="card-body text-center">
                <i className="fa-solid fa-book-open-reader fs-1 bg-danger p-3 rounded-5 text-white"></i>
                <h5 className="card-title mt-1">Pedidos</h5>
                <h3 className="fs-3">
                  Count
                  <i className="fa-solid fa-caret-up text-primary p-1 fs-3"></i>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
