
import "./Signup.css"

const Signup = () => {
  return (
    <div id="signup">
      <div className="signup-form">
        <h2>Signup</h2>
        <form action="#"  id="form">
          <div className="name-box">
            <div className="first-name-box">
            <label htmlFor="firstname"> First Name :-</label>
            <input type="text" name="name"  id="firstname" placeholder="Enter your first name"/>
            </div>
            <div className="last-name-box">
            <label htmlFor="secondname"> Last Name :-</label>
            <input type="text" name="name"  id="secondname" placeholder="Enter your last name"/>

            </div>
          </div>
            <label htmlFor="rollno">Enter your College RollNo :-</label>
            <input type="text" id="rollno" name="rollno" placeholder="Enter your RollNo "/>

           <label htmlFor="gmail">Enter your gmail :-</label>
            <input type="text" name="gmail" id="gmail" placeholder="yourname@gmail.com"/>

            <label htmlFor="password">Create a password :-</label>
            <input type="current-password" id="password" name="password"placeholder="Create a password"/>
            <label htmlFor="passwordcheck">Confirm password :-</label>
            <input type="new-password" id="passwordcheck" name="passwordcheck" placeholder="Re-enter your password"/>
            <button className="btn">Signup</button>

        </form>
      </div>
    </div>
  )
}

export default Signup
