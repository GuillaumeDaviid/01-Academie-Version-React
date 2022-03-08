import React,{ createContext, useState, useCallback } from "react";

export const ModulesContext = createContext()

export const ModulesProvider = ({ children }) => {
  const [getIdModules, setGetIdModules] = useState("");
  const [getCoursesIdModules, setGetCoursesIdModules] = useState("");
  const [getPositionModules, setGetPositionModules] = useState("");
  const [getExpModules, setGetExpModules] = useState("");

  const handleClickModules = useCallback((id, courses, position, exp) => {
    setGetIdModules(id)
    setGetCoursesIdModules(courses)
    setGetPositionModules(position)
    setGetExpModules(exp)
  }, [])


  return (
    <ModulesContext.Provider value={{ handleClickModules, getIdModules, getCoursesIdModules, getPositionModules, getExpModules }} >
      {children}
    </ModulesContext.Provider>
  )
}