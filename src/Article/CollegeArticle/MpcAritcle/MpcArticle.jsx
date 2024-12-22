import React, { useContext, useEffect, useRef, useState } from 'react'
import './MpcArticle.css'
import image2 from '../../ArticlePhotoes/Colleges/MPCautoCollege/mpc2.jpg'
import image3 from '../../ArticlePhotoes/Colleges/MPCautoCollege/mpc3.jpg'
import image4 from '../../ArticlePhotoes/Colleges/MPCautoCollege/mpc4.jpg'
import image5 from '../../ArticlePhotoes/Colleges/MPCautoCollege/mpc5.jpg'
import image6 from '../../ArticlePhotoes/Colleges/MPCautoCollege/mpc6.jpg'
import { ArticleSubheadingContext } from '../../../Context/ArticleSubheading/ArticleSubheading'
const MpcArticle = () => {
  const subhheadingRef = useRef();
  const { setHeading } = useContext(ArticleSubheadingContext);
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);


  useEffect(() => {
    const text = subhheadingRef.current?.innerText || '';
    setHeading(text);

  }, []);

  return (
    <section id='mpc-article'>
      <div className="mpc-article-box">
        <h1 ref={subhheadingRef}>M.P.C Autonomous College : History of Mpc autonomous college</h1>
        <h2> The Rich Legacy of Maharaja Purna Chandra Autonomous College</h2>
        <p>Maharaja Purna Chandra Autonomous College, popularly known as MPC Autonomous College, is one of Odisha's oldest and premier institutions of higher education. Established in <strong> July 1948</strong>, <br /> in post-independence India, the college holds a place of pride in the educational landscape of the region.</p>
        <p>
          Established in the era of <strong> Late Sri Sarat Chandra Das</strong>, then <strong>Prime Minister of Mayurbhanj</strong>, and under the patronage of Maharaja Sri Pratap Chandra Bhanj Deo, it derived its name after Late Maharaja Purna Chandra Bhanj Deo, the renowned patron of letters and culture, whose vision inspires the Institution's mission even to this date.
        </p>

        <div className="mpc-image-1">
          <img src={image3} />
        </div>
        <p>
          Initially, the college began its journey on the premises of <strong> Maharaja Krushna Chandra High School (M.K.C.)</strong>, accommodating a growing number of students. However, the demand for a dedicated campus became apparent as enrollment surged.</p>
        <p>
          It was in the early 1960s that the college shifted to the historic Maharaja's Palace, acquired by the Government of Odisha in 1956. This shift was thus a new chapter where the legacy of the past met with the ambitions of the future.
        </p>
        <p>
          In 2001, the institution moved into a  <strong>state-of-the-art complex at Takhatpur</strong>, its metamorphosis into a thoroughly modern center of learning now complete.
        </p>
       


        <h2>Academic Excellence and Growth</h2>
       
        <p>From its humble beginning with Intermediate Arts and Science courses, the MPC Autonomous College has grown exponentially in its <strong> academic portfolio. Affiliated initially with Utkal University</strong>, the college started the Bachelor of Arts (Pass) course in 1949 comprising English, Odia, Economics, and Mathematics. <br /> During the next two decades, a number of Honours courses were added: Economics in 1961, Political Science in 1963, and English in 1965. </p>
        <div className="mpc-image-1">
          <img src={image2} />
        </div>
        <p>The faculty of Science started expanding, starting with Physics, Chemistry, and Mathematics in 1960-61. Later, Botany and Zoology were added. Honours courses in these subjects followed suit in the late 1960s and early 1970s.
        </p>
        <p>
          Growth of Commerce faculty was no exception, with Pre-University Commerce in 1965 and Honours in 1974-75. Deluge of Post-Graduate courses in <strong> Commerce, History, Economics, Philosophy, Chemistry, Political Science</strong> amongst others flooded in during the 1980s and 1990s.
        </p>
        <p>
          By the time the 2000s rolled in, self-financing courses in <strong> Environmental Economics, Microbiology, Industrial Chemistry, and Biochemistry </strong>  had managed to keep up with the changing academic trends at the college.
        </p>
        <h2>Autonomy and Modernization</h2>

        <p>In 2000, MPC College obtained the autonomous status, which empowered it to design its own curriculum, conduct independent examinations, and introduce innovative pedagogical practices.
        </p>
        <p>
          Real academic autonomy came in <strong> 2001-2002</strong> with the introduction of entrance examinations and specialized study programs for undergraduate and postgraduate students.
        </p>
        <div className="mpc-image-1">
          <img src={image6} />
        </div>
        <p>
          The shift to the new campus in 2001 added modern facilities without losing its historical value.  Further,<br /> the merger of M.P.C Morning College and Women's College streams into one strengthened <br /> its position as a multidisciplinary educational powerhouse.
        </p>
        <p>
          Today, the college comprises a Junior College for +2 classes and a Senior College that offers undergraduate and postgraduate courses in six departments: <strong> Odia, English, History, Political Science, Philosophy, and Commerce.</strong></p>

        <h2>Cultural and Regional Impact</h2>
        <p>Nestled on the banks of melodious Budhabalanga, the college flourishes into an intellectual and cultural hub. <br /> Its location in the <strong> heart of Baripada </strong>will enable the institution to blend metropolitan dynamism with the serenity of an academic atmosphere.
        </p>
        <div className="mpc-image-1">
          <img src={image4} />
        </div>
        <p>
          For decades together, MPC Autonomous College has molded many minds and attracts students not only from Odisha but also from neighboring states.
          <br />
          It stands tall with a myriad of courses ranging from academics to vocational, embodying the zeal in the air. Following the clarion call of its founder,  Late Maharaja Purna Chandra Bhanj Deo,<br /> this institution continues to build the leaders of tomorrow, carrying with it the legacies of yesteryears and promises of better times ahead.</p>

          <div className="mpc-image-1">
          <img src={image5} />
        </div>

      </div>
    </section>
  )
}

export default MpcArticle
