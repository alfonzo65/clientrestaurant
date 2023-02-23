import "../style/navigationAdmin.css";

function Header() {

  return (
    <header className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-white p-2">
        <span className="material-symbols-outlined fs-1 rounded-4 bg-black p-1 float-start">
              monitoring
            </span>
          <h2 className="text-center">
            Bienvenido { sessionStorage.getItem("rol") }
          </h2>
        </div>
      </div>
    </header>
  );
}

export default Header;

