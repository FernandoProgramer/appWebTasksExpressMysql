import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/notFound.jsx';
import { Navbar } from './components/Navbar.jsx';
import { TasksPages } from './pages/task/TasksPages.jsx';
import { TasksSaved } from './pages/task/TasksSaved.jsx';
import { RegisterUser } from './pages/user/RegisterUser.jsx';
import { Footer } from './components/Footer.jsx';

const App = () => {
  return (
    <>
      <Navbar />
      {/* Enrutador de vistas */}
      <Routes>
        <Route path='/' element={<TasksPages />} />
        <Route path='/newTask' element={<TasksSaved />} />

        {/* acciones del usuario */}
        <Route path='/register' element={<RegisterUser />} />


        <Route path='*' element={< NotFound />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App;