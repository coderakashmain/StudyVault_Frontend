import {
    UploadCloud,
    BookOpen,
    Calendar,
    GraduationCap,
    Layers,
    FileText,
    Info,
    CircleDot,
    NotepadTextDashed
} from "lucide-react";
import { degrees,  PDFDocument, rgb } from 'pdf-lib';
import { AlartContectValue } from "../Context/AlartContext/AlartContext";
import { useContext, useEffect, useRef, useState } from "react";
import useApi from "../hooks/useApi";
import { Departmentlistdata } from "../Context/DepartmentList/DepartmentListContext";
import { useUserData } from "../Context/UserContext/UserContextdata";
import { useNavigate } from "react-router";


export default function UploadQuestionPaper() {
    const { showAlart } = useContext(AlartContectValue);
    const {usernav} = useUserData();
    const { post, loading } = useApi();
    const departmentListdata = useContext(Departmentlistdata);
    /* -------------------- STATE (NO UI CHANGE) -------------------- */
    const [departmentName, setDepartmentName] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [years, setYears] = useState("");
    const [semester, setSemester] = useState("");
    const [title, setTitle] = useState("");
    const [departmentYear, setDepartmentYear] = useState(""); // exam type
    const [pdf, setPdf] = useState(null);
    const [examCategory, setExamCategory] = useState("");
    const navigate = useNavigate();

    // sem / midSem (default sem = 1)

    useEffect(()=>{
        if(!usernav){
            navigate('/login')
        }

    },[usernav])
 
      useEffect(() => {
            const yearMap = {
                '1stsem': '1st',
                '2ndsem': '1st',
                '3rdsem': '2nd',
                '4thsem': '2nd',
                '5thsem': '3rd',
                '6thsem': '3rd',
                '7thsem': '4th',
                '8thsem': '4th'
            };
    
            const studentyear = yearMap[semester] || '';
    
            setDepartmentYear(studentyear); 
                
        }, [semester]);

   

    useEffect(()=>{
        if(departmentName==="E&V"){
            setExamCategory("sem");
        }
    },[departmentName])

        const addWatermark = async (file, watermarkText) => {
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pages = pdfDoc.getPages();
    
            pages.forEach((page) => {
                const { width, height } = page.getSize();
                page.drawText(watermarkText, {
                    x: width / 2 - 100,
                    y: height / 2,
                    size: 40,
                    color: rgb(0.75, 0.75, 0.75),
                    opacity: 0.4,
                    rotate: degrees(45),
                });
            });
    
            const watermarkedPdfBytes = await pdfDoc.save();
            const watermarkedFile = new File([watermarkedPdfBytes], file.name, { type: file.type });
            return watermarkedFile;
        };


    const fileInputRef = useRef(null);

     const handleUpload = async () => {
        if (pdf) {
            const newFileName = `${departmentName}_${years}_${semester}_${title}_${examCategory}_${educationLevel}_${departmentYear}.pdf`;
            
            // Rename the file
            const renamedFile = new File([pdf], newFileName, { type: pdf.type });
            const watermarkedFile = await addWatermark(renamedFile, 'StudyVault - Protected');
            return watermarkedFile;
        }
        return null;
    };


    /* -------------------- SUBMIT -------------------- */
    const handleSubmit = async () => {
        if (!departmentName || !educationLevel || !years || !title || !pdf) {
            return showAlart("All required fields must be filled", "", "cancel");
        }
        if (!examCategory) {
            return showAlart("Please select exam category", "", "cancel");
        }
       

        const renamefile = await handleUpload(pdf);
        const formData = new FormData();

     
        formData.append("departmentName", departmentName);
        formData.append("educationLevel", educationLevel.toLowerCase()); // ug / pg
        formData.append("years", Number(years));
        formData.append("departmentYear", departmentYear); // exam type
        formData.append("semester", semester);
        formData.append("title", title);
        formData.append("renamedFile", renamefile.name);
        formData.append("sem", examCategory === "sem" ? 1 : 0);
        formData.append("midSem", examCategory === "midSem" ? 1 : 0);

        formData.append("pdf", pdf);

       
       

        try {
            await post("/user/upload", true, formData);
            showAlart("Uploaded successfully", "Pending admin approval", "check");

            // reset state
            setDepartmentName("");
            setEducationLevel("");
            setYears("");
            setSemester("");
            setTitle("");
            setDepartmentYear("");
            setPdf(null);
        } catch (err) {
            showAlart(err?.message || "Upload failed", "", "cancel");
        }
    };

    /* -------------------- JSX (UNCHANGED DESIGN) -------------------- */
    const disabledExamTypes = ["Elective", "Compulsory", "E&V"];

    if(!usernav) return null;

    return (
        <>
            <section className="pt-33! w-full m-auto  bg-[#f9fbfb]">
                <div className="container min-h-screen ">
                    <div className=" text-white">
                        <div className="max-w-7xl mx-auto px-6 py-14 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold! text-blue-950!">
                                    Upload Question Papers
                                </h1>
                                <p className="text-gray-600! mt-2!  max-w-xl">
                                    Help other students by uploading previous year question papers.
                                    Your upload will be reviewed before publishing.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto  py-12! grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-md shadow-lg p-8!">
                            <h2 className="text-xl text-blue-950! font-semibold! mb-6! flex items-center gap-2!">
                                Upload Question Paper
                            </h2>
                            <div className="flex gap-4 text-sm! mb-8! select-none items-center"><span><CircleDot size={16} color="#4e899c" /></span> <span>Step 1</span> <div className="flex flex-1 items-center gap-6 text-sm text-gray-200!">Select <div className="h-px!  w-full flex-1 bg-gray-200!"></div> </div> </div>

                            <div className="grid grid-cols-1 gap-5!">
                                {/* Exam Type */}
                                <div>
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <NotepadTextDashed size={16} color="#4e899c" />Exam Type
                                    </label>
                                    <div className="flex gap-3 mt-2!">
                                        {["Honors", "Elective", "Compulsory", "E&V"].map((type) => {
                                            const isActive =
                                                departmentName === type ||
                                                (type === "Honors" &&
                                                    departmentName !== "Elective" &&
                                                    departmentName !== "Compulsory" &&
                                                    departmentName !== "E&V");

                                            return (
                                                <button
                                                    key={type}
                                                    onClick={() => setDepartmentName(type === "Honors" ? "" : type)}
                                                    className={`cursor-pointer px-4! py-2! rounded-sm border transition
        ${isActive
                                                            ? "bg-blue-400 text-white! border-blue-400"
                                                            : "border-gray-300 hover:bg-blue-50"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            );
                                        })}

                                    </div>
                                </div>

                                {/* Department */}
                                <div >
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <BookOpen size={16} color="#4e899c" /> Department  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                    </label>

                                    <select
                                        className={`mt-2! w-full rounded-sm border border-gray-300 px-4! py-2! 
    ${disabledExamTypes.includes(departmentName)
                                                ? "bg-gray-100! text-gray-400! cursor-not-allowed"
                                                : "border-gray-300!"
                                            }`}
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                        value={departmentName}
                                        disabled={disabledExamTypes.includes(departmentName)}
                                    >
                                        <option value="">Select Department</option>

                                        {departmentListdata.map((department, index) => (
                                            <option key={index} value={department} className="text-gray-700">
                                                {department}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* Education */}

                                <div>
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <GraduationCap size={16} color="#4e899c" /> Education Level  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                    </label>

                                    <select
                                    value={educationLevel}
                                        className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2!"
                                        onChange={(e) => setEducationLevel(e.target.value)}
                                    >
                                        <option value="">Select Education Level</option>
                                        <option value="ug">UG</option>
                                        <option value="pg">PG</option>
                                    </select>
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Calendar size={16} color="#4e899c" /> Session Year  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="2024"
                                        className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2!"
                                        onChange={(e) => setYears(e.target.value)}
                                        value={years}
                                    />
                                </div>

                                {/* Semester */}
                                <div>
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Layers size={16} color="#4e899c" /> Semester  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                    </label>

                                    <select
                                        className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2!"
                                        onChange={(e) => setSemester(e.target.value)}
                                        value={semester}
                                    >
                                        <option value="">Choose Semester</option>
                                        <option value="">Choose Semester</option>
                                        <option value="1stsem">1st sem</option>
                                        <option value="2ndsem">2nd sem</option>
                                        <option value="3rdsem">3rd sem</option>
                                        <option value="4thsem">4th sem</option>
                                        <option value="5thsem">5th sem</option>
                                        <option value="6thsem">6th sem</option>
                                        <option value="7thsem">7th sem</option>
                                        <option value="8thsem">8th sem</option>
                                    </select>
                                </div>

                                {/* Exam Category */}
                                <div>
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <CircleDot size={16} color="#4e899c" /> Exam Category
                                        <div className="h-px! w-full flex-1 bg-gray-200!"></div>
                                    </label>

                                    <div className="flex gap-3 mt-2!">
                                        {/* Semester Exam */}
                                        <button
                                            type="button"
                                            onClick={() => setExamCategory("sem")}
                                            className={`px-4! py-2! rounded-sm border transition cursor-pointer
      ${examCategory === "sem"
                                                    ? "bg-blue-400 text-white!  border-blue-400"
                                                    : "border-gray-300 hover:bg-blue-50"
                                                }`}
                                        >
                                            Semester Exam
                                        </button>

                                        {/* Mid-Semester Exam */}
                                        <button
                                            type="button"
                                            onClick={() => departmentName !== "E&V" && setExamCategory("midSem")}
                                            disabled={departmentName === "E&V"}
                                            className={`px-4! py-2! rounded-sm border transition  cursor-pointer
      ${departmentName === "E&V"
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                                                    : examCategory === "midSem"
                                                        ? "bg-blue-400 text-white! border-blue-400"
                                                        : "border-gray-300 hover:bg-blue-50"
                                                }`}
                                        >
                                            Mid-Semester Exam
                                        </button>
                                    </div>

                                </div>

                                {/* Paper Name */}

                                <div>
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <FileText size={16} color="#4e899c" /> Paper Name  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        placeholder="Core-1 / CC101"
                                        className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2!"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* File Upload (logic only) */}
                            <div
                                className="mt-8! border-2 border-dashed rounded-xl p-10! text-center bg-[#f9fbfb] border-blue-200 hover:border-blue-400 transition"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <UploadCloud size={40} className="mx-auto! text-blue-500! " color="oklch(62.3% 0.214 259.815)" />
                                <p className="mt-4!">
                                    {pdf ? (
                                        pdf.name
                                    ) : (
                                        <>
                                            Drag & drop or{" "}
                                            <span className="text-blue-600! font-medium! cursor-pointer">
                                                Browse
                                            </span>{" "}
                                            your PDF file
                                        </>
                                    )}
                                </p>

                                <input
                                    ref={fileInputRef}
                                    
                                    type="file"
                                    accept="application/pdf"
                                    hidden
                                    onChange={(e) => setPdf(e.target.files[0])}
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-8!">
                                <button
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className="px-6! py-2! rounded-sm bg-yellow-500 text-white! cursor-pointer hover:bg-yellow-600 transition"
                                >
                                    {loading ? "Uploading..." : "Submit for Review"}
                                </button>
                            </div>
                        </div>

                        {/* Guidelines unchanged */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6! h-fit">
                            <h3 className="font-semibold flex items-center gap-2 mb-4!">
                                <Info size={18} className="text-yellow-600" />
                                Important Guidelines
                            </h3>
                            <ul className="text-sm text-gray-700 space-y-3!">
                                <li className="flex items-start gap-3">
                                    <span className="mt-2! h-2 w-2 rounded-full bg-yellow-400 shrink-0"></span>
                                    File must be clear & readable
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt-2! h-2 w-2 rounded-full bg-yellow-400 shrink-0"></span>
                                    Only original question papers allowed
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt-2! h-2 w-2 rounded-full bg-yellow-400 shrink-0"></span>
                                    Incorrect uploads will be rejected
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt-2! h-2 w-2 rounded-full bg-yellow-400 shrink-0"></span>
                                    Approval may take 24–48 hours
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}




