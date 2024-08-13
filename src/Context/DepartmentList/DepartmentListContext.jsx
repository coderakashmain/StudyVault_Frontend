import React,{createContext} from "react";

export const  Departmentlistdata = createContext();



const DepartmentListContext = (props)=>{
    
    
    
    const departments = [
        "Computer Science",
        "Bachelor of Computer Application",
        "Botany",
        "Chemistry",
        "Data Science",
        "Geology",
        "Itm",
        "Mathmatics",
        "Physics",
        "Sericalture",
        "Statistics",
        "Zoology",
    
        "Commerce",
    
        "Anthropoloy",
        "Economics",
        "Education",
        "English",
        "Geography",
        "Hindi",
        "History",
        "Sociology",
        "Odia",
        "Philosophy",
        "Political Science",
        "Psychology",
        "Sanskrit",
        "Santali",
    
        "Master of Business Administration",
        "Master of Computer Applications",
        "Micro Biology",
        "Bio-Chemistry",
        "Enviromental Economics",
        "Industrial Chemistry",
      ];
    
      const sortedDepartments = departments.sort((a, b) => a.localeCompare(b));
return (

    <Departmentlistdata.Provider value={sortedDepartments}>
        {props.children}
    </Departmentlistdata.Provider>
)
}

export default DepartmentListContext;

