
import Scrollbtn from "../Component/Scrollbtn/Scrollbtn"
import Footer from '../Pages/Home/FooterS/Footer'
import HomeT from '../Pages/Home/HomeS/HomeT'
import { Outlet } from 'react-router-dom'
import UploadSection from '../Pages/Home/UploadSection/UploadSection'
import SectionSelector from '../Component/SectionSelector/SectionSelector'
import CollegeInfo from '../CollegeInfo/CollegeInfo'
import Websiteinfo from '../Pages/Home/WebsiteInfo/Websiteinfo'


const Home = (props) => {

  return (
    <>

      <Scrollbtn navRefvalue={props.navRefvalue} />
      <HomeT title={'Your StudyVault'} titlepara={'Welcome to StudyVault, Get all Previous Year Question Papers of M.P.C Autonomous college. We shall try to provides note also. So I gonna help you in your all exams if you make me your exam Bff😊. '} />
      <SectionSelector />
      <Outlet />

      <UploadSection />
      <CollegeInfo />

     <Websiteinfo showAlart={props.showAlart} />
       <Footer />
    </>
  )
}

export default Home
