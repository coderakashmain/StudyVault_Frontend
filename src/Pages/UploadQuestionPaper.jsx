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
import { AlartContectValue } from "../Context/AlartContext/AlartContext";
import { useContext } from "react";

export default function UploadQuestionPaper() {
    const{showAlart} = useContext(AlartContectValue);
    
    return (
        <>
        <section className="pt-33! w-full m-auto  bg-[#f9fbfb]">
            <div className="container min-h-screen ">
                {/* Header Section */}
                <div className=" text-white">
                    <div className="max-w-7xl mx-auto px-6 py-14 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold! text-blue-950!">Upload Question Papers</h1>
                            <p className="text-gray-600! mt-2!  max-w-xl">
                                Help other students by uploading previous year question papers.
                                Your upload will be reviewed before publishing.
                            </p>

                            <p className="bg-red-300 py-2! select-none mt-5! px-4! text-red-900! rounded-2xl! inline-block text-xs">Available Soon (Not Working For Now)</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto  py-12! grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Form */}
                    <div className="lg:col-span-2 bg-white rounded-md shadow-lg p-8!">
                        <h2 className="text-xl text-blue-950! font-semibold! mb-6! flex items-center gap-2!">
                            Upload Question Paper
                        </h2>
                        <div className="flex gap-4 text-sm! mb-8! select-none items-center"><span><CircleDot size={16} color="#4e899c" /></span> <span>Step 1</span> <div className="flex flex-1 items-center gap-6 text-sm text-gray-200!">Select <div className="h-px!  w-full flex-1 bg-gray-200!"></div> </div> </div>
                        <div className="grid grid-cols-1 gap-5! ">
                            {/* Department */}

                            <div>
                                <label className="text-sm font-medium flex items-center gap-2"><NotepadTextDashed size={16} color="#4e899c" />Exam Type  <div className="h-px!  w-full flex-1 bg-gray-200!"></div></label>
                                <div className="flex gap-3 mt-2!">
                                    {["Honors", "Elective", "Compulsory", "E&V"].map((type) => (
                                        <button
                                            key={type}
                                            className="px-4! py-2! rounded-sm border border-gray-300  hover:bg-blue-50 transition"
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div >
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <BookOpen size={16} color="#4e899c" /> Department  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                </label>
                                <select className="mt-2! w-full  rounded-sm border border-gray-300 px-4! py-2! focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Select Department</option>
                                    <option>Computer Science</option>
                                    <option>Commerce</option>
                                    <option>Economics</option>
                                </select>
                            </div>

                            {/* Education Level */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <GraduationCap size={16} color="#4e899c" /> Education Level  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                </label>
                                <select className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2! focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Select Education Level</option>
                                    <option>UG</option>
                                    <option>PG</option>
                                </select>
                            </div>

                            {/* Session */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Calendar size={16} color="#4e899c" /> Session Year  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                </label>
                                <input
                                    type="text"
                                    placeholder="2024"
                                    className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2! focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Semester */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Layers size={16} color="#4e899c" /> Semester  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                </label>
                                <select className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2! focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Choose Semester</option>
                                    <option>Semester 1</option>
                                    <option>Semester 2</option>
                                </select>
                            </div>

                            {/* Exam Type */}


                            {/* Paper Name */}
                            <div>
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <FileText size={16} color="#4e899c" /> Paper Name  <div className="h-px!  w-full flex-1 bg-gray-200!"></div>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Core-1 / CC101"
                                    className="mt-2! w-full rounded-sm border border-gray-300 px-4! py-2! focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="mt-8! border-2 border-dashed rounded-xl p-10! text-center bg-[#f9fbfb] border-blue-200 hover:border-blue-400 transition">
                            <UploadCloud className="mx-auto! text-blue-500! " color="oklch(62.3% 0.214 259.815)" size={40} />
                            <p className="mt-4!  text-md sm:text-xl  ">
                                Drag & drop or{" "}
                                <span className="text-blue-600! font-medium! cursor-pointer">
                                    Browse
                                </span>{" "}
                                your PDF file
                            </p>
                            <p className="text-xs text-gray-500! mt-1!">
                                Max size: 10MB · Format: PDF
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 mt-8!">
                            <button className="px-6! py-2! rounded-sm bg-[#f9fbfb] border border-gray-300 hover:bg-gray-100 transition">
                                Cancel
                            </button>
                            <button onClick={()=>     showAlart('Available Soon', '','mark')} className="px-6! py-2! rounded-sm bg-yellow-500 text-white! cursor-pointer hover:bg-yellow-600 transition">
                                Submit for Review
                            </button>
                        </div>
                    </div>

                    {/* Guidelines */}
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
