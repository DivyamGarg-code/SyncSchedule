import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Home/Body';
import ErrorPage from './components/Error/ErrorPage';
import TimeTable from './components/TimeTableSchedule/TimeTable';
import Home from './components/Home/Home';
import Rooms from './components/Room/Rooms';
import Classes from './components/Class/Classes';
import Courses from './components/Course/Courses';
import Permissions from './components/Permission/Permissions';
import Events from './components/Event/Events';
import Login from './components/Login/Login';
import {Provider} from 'react-redux'
import appStore from './utils/appStore';
import Teachers from './components/Teacher/Teachers';

function App() {
  const appRouter=createBrowserRouter([
    {
      path: '/',
      element: <Body />,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/timetable',
          element: <TimeTable/>
        },
        {
          path: '/rooms',
          element: <Rooms/>
        },
        {
          path: '/teachers',
          element: <Teachers/>
        },
        {
          path: '/classes',
          element: <Classes/>
        },
        {
          path: '/courses',
          element: <Courses/>
        },
        {
          path: '/events',
          element: <Events/>
        },
        {
          path: '/permissions',
          element: <Permissions/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '*',
          element: <ErrorPage/>
        }
      ],
    },

  ])
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
    </Provider>
  );
}

export default App;
