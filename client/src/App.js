import { createContext, useState } from 'react';
import './App.css';
import axios from 'axios'

import { Switch,Route, withRouter} from  "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedRoute/ProtectedAdminRoute'

import Navbar from './components/navbar/navbar'
import Navbarres from "./components/navbar/navbarloggedin"
import SignIn from './pages/authentication/signin/signin';
import SignUp from './pages/authentication/signup/signup';
import PostNewJob from './pages/admin/postnewjob/postnewjob';

import ProfileUpdate from './pages/profileupdate/profileupdadte'
import Home from './pages/home/home';

import ForgotPassword from './pages/authentication/forgotpassword/forgotpassword'
import ResetPassword from './pages/authentication/forgotpassword/resetpassword'

import MyProfile from './pages/profile/myprofile/myprofile'

import Dashboard from './pages/admin/Dashboard/dashboard'
import MyJobs from './pages/jobs/myjobs/myjobs';
import AppliedJobs from './pages/appliedjobs/appliedjobs';
import SavedJobs from './pages/savedjobs/savedjobs';
import InnerPage from './pages/jobs/myjobs/innerpage';
import Candidates from './pages/admin/candidates/candidates';
import AuthRoute from './components/ProtectedRoute/AuthRoute';


axios.defaults.url = 'http://localhost:8080'
// axios.defaults.url = 'http://192.168.0.203:8080'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = true
axios.defaults.withCredentials = true

// const [toastMessage, setToastMessage] = useState('')

// const setToast = (message) => {
//   setToastMessage(message)
// }

// export const Toaster = createContext(toastMessage)

const App = withRouter(({location}) => {        


  return (
  <>        
    {
    // (
      // location.pathname.toLowerCase() !== '/signin'&&
      // location.pathname.toLowerCase() !== '/signup' &&
      // location.pathname.toLowerCase() !== '/forgotpassword' &&
      // location.pathname.toLowerCase() !== '/resetpassword'
      // location.pathname.toLowerCase() !== '/admin/postnewjob' &&
      // location.pathname.toLowerCase() !== '/admin/jobupdate' 
      // ) &&
      <Navbarres />}    
      <Switch>
        <Route path='/' exact render ={(props) => <Home  {...props} />} />
        <Route path='/viewjob' component={InnerPage} />

        <AuthRoute path='/signup' component={SignUp} />        
        <AuthRoute path='/signin' component={SignIn} />
        <AuthRoute path='/forgotpassword' component={ForgotPassword} />
        <AuthRoute path='/newpassword' component={ResetPassword} />        
        {/* <Route path='/postnewjob' component={PostNewJob} /> */}        

        <ProtectedRoute path='/profileupdate' component={ProfileUpdate} />
        <ProtectedRoute path='/appliedjobs' component={AppliedJobs} />
        <ProtectedRoute path='/savedjobs' component={SavedJobs} />
        <ProtectedRoute path='/myprofile' component={MyProfile} />   
             
        {/* <Protected path='/admin/postedjobs' component={MyJobs} /> */}
        <ProtectedAdminRoute path='/admin/profileupdate' component={ProfileUpdate} />
        <ProtectedAdminRoute path='/admin/viewcandidates' component={Candidates} />
        <ProtectedAdminRoute path='/admin/myprofile' component={MyProfile} />        
        <ProtectedAdminRoute path='/admin/postnewjob' component={PostNewJob} />
        <ProtectedAdminRoute path='/admin/jobupdate' component={PostNewJob} />
        <ProtectedAdminRoute path='/admin/postedjobs' component={MyJobs} />        
        <ProtectedAdminRoute path='/admin/dashboard' component={Dashboard} />

        <Route component={() => { return <div>Page Not found</div>}} />
      </Switch>           

      {/* <PostNewJob /> */}
      {/* <Myjobs/>        */}
      {/* <Candidates /> */}

    </>
  );
})

export default App;
