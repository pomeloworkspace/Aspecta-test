import {HelmetProvider} from "react-helmet-async";
import Main from "~/components/root/Main";
import "tailwindcss/tailwind.css"
export const App = () => {
  return (
    <HelmetProvider>
      <Main />
    </HelmetProvider>
  )
};
