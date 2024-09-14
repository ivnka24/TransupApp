import "./App.css";
import Layouts from "./layouts/Layouts";
import Header from "./Components/Header";
import SliderItems from "./layouts/SliderItems";
import FormSewa from "./layouts/FormSewa";
import Mitra from "./Components/Mitra";
import TourDestination from "./Components/TourDestination";
import Faq from "./Components/Faq";
import Testimoni from "./Components/Testimoni";

function App() {
  return (
    <Layouts>
      <Header />
      <SliderItems />
      <FormSewa />
      <TourDestination />
      <Mitra />
      <Faq />
      <Testimoni />
    </Layouts>
  );
}

export default App;
