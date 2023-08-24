import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { API } from "../../api/api-service";

function UserRoleRedirect(targetRole) {
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    if (!token['mr-token']) {
      window.location.href = '/';
    } else {
      API.studentOrOffice(token['mr-token'])
        .then(role => {
           if (role === 2) {
            window.location.href = `/office`;
          } else if (role === 3) {
            alert('אין לך הרשאה לעבור לדף זה');
          }
        })
        .catch(error => console.log(error));
    }
  }, [token, targetRole]);
}

export default UserRoleRedirect;
