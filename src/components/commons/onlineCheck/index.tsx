import React, { useEffect, useState } from "react"

import { store } from "../../../storage/redux-storage";
import { Http, HttpCustomStructure } from "../../../utils/http";


export const OnlineCheck: React.FC<any> = () => {

  const storeObject = store
  const [cycle, updateCycle] = useState<number>(0)

  const validation = async () => {
    const auth = storeObject.getState()?.auth?.user?.token ? true : false
    const token = storeObject.getState().auth.user?.token || ''
  
    if(auth){
      const queryData: HttpCustomStructure = {
        method: 'POST',
        url: `/api/user/check-online`,
        headers: new Headers({
          'Authorization': token
        }),
        params: {
          check: true,
          system: 'app'
        },
        auth_token: token
      }
      await Http.send(queryData)
    }
  }

  useEffect(() => {
    const int = setInterval( () => { updateCycle(Math.random())}, 60000 )
    return () => clearInterval(int)
  }, [])

  useEffect(() => {
    validation()
  }, [cycle])

  useEffect(() => {
    validation()
  }, [])

  return (<></>)
}
