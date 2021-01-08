import React, { useState } from "react";
import Login from "../../pages/Login/Login";
import ConnectionError from "../../pages/ConnectionError/ConnectionError";

import api from "../../services/api";

const HandleConnection = () => {
  const [page, setPage] = useState(false);
  api
    .get("/api/checkdb")
    .then(function (response) {
      setPage(true);
    })
    .catch(function (error) {
      console.log(error);
      setPage(false);
    })
    .then(function () {});

  return page ? <Login /> : <ConnectionError />;
};

export default HandleConnection;
