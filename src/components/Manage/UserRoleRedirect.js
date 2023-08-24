import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { API } from "../../api/api-service";

export const UserRoleRedirect = (token,login=false) => {
  if (!token['mr-token']) {
    window.location.href = '/';
  } else {
    return API.studentOrOffice(token['mr-token'])
      .then(role => {
        if (login){
          window.location.href = `/home`;
        }
        if (role === 2) {
          window.location.href = `/office`;
        } else if (role === 3) {
          alert('אין לך הרשאה לעבור לדף זה');
        }
      })
      .catch(error => console.log(error));
  }
};
