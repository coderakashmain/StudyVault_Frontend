import React from "react";


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error("ErrorBoundary caught an error", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <div style={{position : 'fixed',zIndex : '1111111111111111',background : 'white', left : '0', top : '0', display : 'flex', justifyContent : 'center', alignItems : 'center',height :'100%', width : '100%'}}> <h1 style={{margin : '2rem', textAlign : 'center'}}>We are Working on somthing.<br /> Back soon. <span style={{fontSize : '1.4rem'}}>
          </span></h1></div>;
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
  