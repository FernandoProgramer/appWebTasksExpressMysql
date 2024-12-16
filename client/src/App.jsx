import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/notFound.jsx';
import { Navbar } from './components/Navbar.jsx';
import { TasksPages } from './pages/task/TasksPages.jsx';
import { TasksSaved } from './pages/task/TasksSaved.jsx';
import { RegisterUser } from './pages/user/RegisterUser.jsx';
import { Footer } from './components/Footer.jsx';
import { LoginUser } from './pages/user/LoginUser.jsx';
import { ModalSessionExpired } from './components/ModalSessionExpired.jsx';
import { SessionExp } from './api/Session.api.jsx';
import { useEffect, useState } from 'react';
import { UserProvider } from './contexts/Users.context.jsx';
import { TasksProvider } from './contexts/Tasks.context.jsx';

const App = () => {

  return (
    <TasksProvider>
      <UserProvider>
        <Navbar /> {/* Panel de navegacion */}

        {/* Enrutador de vistas */}
        <Routes>
          <Route path='/' element={<TasksPages />} />
          <Route path='/newTask' element={<TasksSaved />} />
          <Route path='/editTask/:id' element={<TasksSaved />} />

          {/* acciones del usuario */}
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/login' element={<LoginUser />} />


          <Route path='*' element={< NotFound />} /> {/* Comodin de rutas 404 */}
        </Routes>

        <Footer />{ /* Pie de pagina */}
        {/* <ModalSessionExpired /> */}
      </UserProvider>
    </TasksProvider>
  )
}

export default App;