import React, { useEffect, useState } from "react";
import Login from "../pages/Login/Login";
import ConnectionError from "../pages/ConnectionError/ConnectionError";

import api from "../services/api";

const HandleConnection = () => {
  const [CheckCon, setCheckCon] = useState(false);

  useEffect(() => {
    api
      .get("/api/checkdb")
      .then(function (response) {
        setCheckCon(true);
      })
      .catch(function (error) {
        setCheckCon(false);
        console.log(error);
      })
      .then(function () {});
  }, []);

  return CheckCon ? <Login /> : <ConnectionError />;
};

export default HandleConnection;
