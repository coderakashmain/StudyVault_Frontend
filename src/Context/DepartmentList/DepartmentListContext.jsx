import React,{createContext} from "react";

export const  Departmentlistdata = createContext();



const DepartmentListContext = (props)=>{
    
    
    
    const departments = [
        "Computer Science",
        "Bca",
        "Botany",
        "Chemistry",
        "Data Science",
        "Geology",
        "BBA",
        "Itm",
        "Mathmatics",
        "Physics",
        "Sericalture",
        "Statistics",
        "Zoology",
        "Home Science",
        "ITEP",
    
        "Commerce",
    
        "Anthropology",
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
    
        "MBA",
        "MCA",
        "Micro Biology",
        "Bio Chemistry",
        "MSW",
        "PUB ADM",
        "Enviromental Economics",
        "Industrial Chemistry",
        "Industrial Sociology",

        "Integrated B.Ed"
      ];
    
      const sortedDepartments = departments.sort((a, b) => a.localeCompare(b));
return (

    <Departmentlistdata.Provider value={sortedDepartments}>
        {props.children}
    </Departmentlistdata.Provider>
)
}

export default DepartmentListContext;

