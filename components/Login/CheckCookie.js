import React from "react";
import { getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import styles from '../../styles/Temp.module.css'
import Router from 'next/router'



const CheckCookie = async () => {
  let dataToCheck = {
      id: getCookie("UserID"),
      cookie: getCookie("User"),
  }

  const response = await fetch("../api/login/checkcookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToCheck),
  });

  if(response.status == 200)
  {
      return true;
  }
  else
  {
      return false;
  }


}


export default CheckCookie;

