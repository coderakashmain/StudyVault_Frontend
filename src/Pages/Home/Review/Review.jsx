import React, { useState, useEffect, useContext } from 'react'
import './Review.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import malelogo from '../../../photo/profile common logo.jpg'
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';


const Review = (props) => {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ name: '', gmail: '', gender: '', message: '' });
  const [load, setLoad] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [activeReplylist, setActiveReplylist] = useState(null);
  const [replypostbtn, setReplypostbtn] = useState(false);
  const {showAlart} = useContext(AlartContectValue);



  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/comments/fetch');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  useEffect(() => {
    fetchComments();

  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      await axios.post('/api/comments', formData);
      fetchComments();
      setFormData({ name: '', gmail: '', gender: '', message: '' });
      setLoad(false);
       showAlart('Comment Post Successfully', '','check');
    } catch (error) {
      console.error('Error posting comment:', error);
      setLoad(false);
       showAlart('Something error', '','cancel');
    }
  };

  const handleReply = async (commentId, replyData) => {
    setReplypostbtn(true);

    try {
      await axios.post(`/api/comments/${commentId}/replies`, replyData);
      fetchComments();
      setReplypostbtn(false);
      setActiveReplyId(null);
      setActiveReplylist(commentId);
       showAlart('Reply Post Successfully', '','check');
    } catch (error) {
      console.error('Error posting reply:', error);
      setReplypostbtn(false);
       showAlart('Something error', '','cancel');
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    };
    return date.toLocaleString('en-GB', options);  // Example: "03 Feb 2025, 15:27"
  };



  return (
    <section id="review">
      <div className="review-inside">


        <h2>Asked Question & Answers</h2>

        <div className="">
          <h2 className='commenthh2' style={{ padding: '3rem 0' }}>Comments (<span >{comments.length}</span>)</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="user-comment">
              <div className="user-comment-box">
                <div className="comment-user-logo">

                  <Avatar alt="Remy Sharp" src={malelogo} sx={{ width: 55, height: 55, padding: '0rem 0rem 0 0', display: 'inline-block', }} />

                  <h4 className="font-bold">{comment.name}</h4>
                </div>
                <div className="comment-user-time-reply">
                  <p>{formatDateTime(comment.created_at)}</p>
                {activeReplyId !== comment.id  && (  <button onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}>
                    {activeReplyId === comment.id ? '' : 'Reply'}
                  </button>)}
                </div>

              </div>
              <div className="reply-message-box">
                <p className='comment-message'>{comment.message} <br style={{ marginTop: '0.5rem' }} />{comment.replies && comment.replies.filter(reply => reply && reply.name && reply.message).length > 0 && (!activeReplylist || activeReplylist !== comment.id ) && (<span style={{ marginTop: ' 2rem', fontSize: '0.9rem', color: 'blue', cursor: 'pointer' }} onClick={() => setActiveReplylist(activeReplylist === comment.id ? null : comment.id)} >
                  {activeReplylist === comment.id ? 'Close' : 'View Replies'}
                  ({comment.replies.filter(reply => reply && reply.name && reply.message).length})</span>)}</p>



                <div className="reply-list">
                  {activeReplyId === comment.id && (
                    <ReplyForm replypostbtn={replypostbtn} replyto={comment.name} commentId={comment.id} onReply={handleReply} />
                  )}
                  {activeReplyId === comment.id  && (  <button className='cancle-reply-btn' onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}>
                    {activeReplyId === comment.id ? 'Cancle Reply' : ''}
                  </button>)}

                  {comment.replies && activeReplylist === comment.id && comment.replies.filter((reply) => reply && reply.name && reply.message).map((reply) => (
                    <div key={reply.id} className="reply-list-item">


                      <div className="user-comment-box">
                        <div className="comment-user-logo">

                          <Avatar alt="Remy Sharp" src={malelogo} sx={{ width: 50, height: 50, padding: '0rem 0rem 0 0', display: 'inline-block', }} />
                          <h4 className="font-bold">{reply.name}</h4>

                        </div>
                        <div className="comment-user-time-reply">
                          <p>{formatDateTime(reply.created_at)}</p>

                        </div>

                      </div>

                      <p className='reply-message-margin' >{reply.message}</p>

                    </div>
                  ))}
                  <div className="reply-like-close-box">
                  <p style={{ color: 'blue', cursor : 'pointer' }} onClick={() => setActiveReplylist(activeReplylist === comment.id ? null : comment.id)}>  {activeReplylist === comment.id ? ' Close ' : ''}</p>

                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>


        <form onSubmit={handleSubmit}>
          <div className="review-write">
            <h3>Leave a Comment</h3>
            <p style={{ margin: '0.8rem 0 0 0', fontSize: '1rem' }}>Required fields are marked <span style={{ color: 'red' }}>*</span></p>
            <div className="review-write-out">

              <div className="reivew-write-left-out">

                <div className="review-input-box">
                  <div className="review-input-each-box">
                    <input type="text" name='name' id='name' placeholder=" " onChange={handleChange} value={formData.name} required />
                    <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span></label>

                  </div>
                  <div className="review-input-each-box gmail-box">

                    <input type="gmail" name='gmail' id='gmail' placeholder=" " onChange={handleChange} value={formData.gmail} required />
                    <label htmlFor="gmail">Gmail <span style={{ color: 'red' }} >*</span></label>
                  </div>
                  <div className="review-input-each-box ">
                    <input type="text" name='gender' id='gender' placeholder=" " onChange={handleChange} value={formData.gender} />
                    <label htmlFor="gender">Gender</label>

                  </div>



                </div>
                <div className="review-input-each-box">
                  <textarea name="message" id="massage" placeholder="Write Comment*" onChange={handleChange} value={formData.message} required></textarea>

                </div>
              </div>

              <div className="reivew-write-right-out"></div>

            </div>
            <button type='submit' disabled={load} className={`comment-post active `} style={{
              background: load ? 'lightgreen' : 'green',
              marginBottom: '2rem'
            }}>POST COMMENT</button>

            {/* <div className="comment-login">
              Login so we can  save your Gmail and Name . <NavLink to='/login'>LogIn</NavLink>
            </div> */}



          </div>
        </form>
      </div>
    </section>
  )
}

const ReplyForm = ({ commentId, onReply, replyto, replypostbtn }) => {
  const [formData, setFormData] = useState({ name: '', gmail: '', gender: '', message: '' });






  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleReplySubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() && formData.gmail.trim() && formData.gender.trim() && formData.message.trim()) {
      onReply(commentId, formData);  // Pass the entire formData object
      setFormData({ name: '', gmail: '', gender: '', message: '' });  // Clear the form after submission
    }
  };

  return (
    <form onSubmit={handleReplySubmit} className="">

      <div className="reivew-write-left-out">
        <h2 style={{ fontSize: '1.3rem', border: 'none', margin: '0.3rem 0' }}> Reply to  {replyto}</h2>
        <div className="review-input-box">
          <div className="review-input-each-box">
            <input type="text" name='name' id='name' placeholder=" " onChange={handleChange} value={formData.name} required />
            <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span></label>

          </div>
          <div className="review-input-each-box gmail-box">

            <input type="gmail" name='gmail' id='gmail' placeholder=" " onChange={handleChange} value={formData.gmail} required />
            <label htmlFor="gmail">Gmail <span style={{ color: 'red' }} >*</span></label>
          </div>
          <div className="review-input-each-box ">
            <input type="text" name='gender' id='gender' placeholder=" " onChange={handleChange} value={formData.gender} />
            <label htmlFor="gender">Gender</label>

          </div>



        </div>
        <div className="review-input-each-box">
          <textarea name="message" id="massage" placeholder="Write Comment*" onChange={handleChange} value={formData.message} required></textarea>

        </div>
      </div>

      <button disabled={replypostbtn} style={replypostbtn ? { backgroundColor: 'lightgreen' } : {}} type="submit" className=" reply-submit-btn active"> Post Reply</button>
    </form>
  );
};

export default Review
