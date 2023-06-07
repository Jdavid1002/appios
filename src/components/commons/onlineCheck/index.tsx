import React, { useEffect, useState } from "react"
import AuthService from "../../../services/auth/auth";


export const OnlineCheck: React.FC<any> = () => {

  const [cycle, updateCycle] = useState<number>(0)
  const authService = new AuthService();

  useEffect(() => {
    const int = setInterval( () => { updateCycle(Math.random())}, 60000 )
    return () => clearInterval(int)
  }, [])

  useEffect(() => {
    authService.userStatus()
  }, [cycle])

  useEffect(() => {
    authService.userStatus()
  }, [])

  return (<></>)
}
