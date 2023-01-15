
import { createContext, useEffect, useState } from "react";

// creacion de un contexto

// almacena los datos del contexto
export const UserContext = createContext();

// componente que va a englobar a todos
export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null)

  function setUserName( userName ) {
    setUser(userName)
  }

  function setUserRol( userRol ) {
    setRol(userRol)
  }

  return (
    <UserContext.Provider value={{
        user,
        rol,
        setUserName,
        setUserRol,
        props
    }}>
      {props.children}
    </UserContext.Provider>
  );
}