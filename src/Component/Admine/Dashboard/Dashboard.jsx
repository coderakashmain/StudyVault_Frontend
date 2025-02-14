import React, { useContext ,useEffect,useState} from 'react'
import './Dashboard.css'
import { FetchDataContext } from '../../../Context/FretchDataContext/FetchData'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';

const Dashboard = (props) => {
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();

    const {paperList,setPaperList} = useContext(FetchDataContext);
    const {showAlart} = useContext(AlartContectValue);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/admin/fetchData', { withCredentials: true });
                if (response.status === 200) {
                    setPaperList(response.data); // Update the context
                    setTotalCount(response.data.length); 
                    // Update the totalCount directly
                } else {
                     showAlart("Error fetching Data", "", "mark");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                 showAlart("Error fetching Data", "", "mark");
            }
        };
        fetchData();
    }, []); // Ensure this useEffect runs on mount

    useEffect(() => {
        if (paperList && Array.isArray(paperList)) {
            setTotalCount(paperList.length); // Update totalCount when paperList changes
        }
    }, [paperList]);


    return (
        <aside id='dashboard'>
            <h1 style={{fontSize : '2rem', fontWeight : '600',margin : '0rem 0 1rem 0'}}>Control Panel<i className="fa-solid fa-gamepad" style={{ color : "#000", padding : '0 1rem'}}></i></h1>
            <div className="dashboard-box">
                <div className="totalquestion common">
                   <i className="fa-solid fa-newspaper FstI" ></i>
                    <h3>{totalCount}</h3>
                    <h4>Total Question Uploads</h4>
                    <p className="moreQuestionUpload common-dash" onClick={()=> navigate('Question')}>
                        More<i className="fa-solid fa-angle-right"></i>
                    </p>

                </div>
                <div className="TotalSyllabus common">
                <i className="fa-solid fa-book-open FstI"></i>
                    <h3>45</h3>
                    <h4>Total Syllabus Uploads</h4>
                    <p className="moreTotalNote common-dash" onClick={()=> navigate('syllabusupload')}>
                        More<i className="fa-solid fa-angle-right"></i>
                    </p>
                </div>

                <div className="TotalNote common">
                <i className="fa-solid fa-book-open FstI"></i>
                    <h3>45</h3>
                    <h4>Total Note Uploads</h4>
                    <p className="moreTotalNote common-dash" onClick={()=> navigate('Notes')}>
                        More<i className="fa-solid fa-angle-right"></i>
                    </p>
                </div>
               
                <div className="totalUserUpload common">
                <i className="fa-regular fa-folder-closed FstI"></i>
                    <h3>45</h3>
                    <h4>Total User Send</h4>
                    <p className="moreQuestionUploads common-dash" onClick={()=> navigate('Usersend')}>
                        More<i className="fa-solid fa-angle-right" ></i>
                    </p>

                </div>
                <div className="classUpload common">
                <i className="fa-solid fa-computer FstI" ></i>
                    <h3>45</h3>
                    <h4>Total Cs Uploads</h4>
                    <p className="moreclassUpload common-dash" onClick={()=> navigate('CsUpload')}>
                        More<i className="fa-solid fa-angle-right"></i>
                    </p>


                </div>
            </div>
        </aside>
    )
}

export default Dashboard
