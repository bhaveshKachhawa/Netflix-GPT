import Body from './components/Body';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Browse from './components/Browse';


function App() {
  const appRoute = createBrowserRouter([
    {
      path:'/',
      element:<Body />
    },
    {
      path:'/browse',
      element:<Browse />
    }
  ]);

  return (
    <RouterProvider router={appRoute}></RouterProvider>
  );
}

export default App
