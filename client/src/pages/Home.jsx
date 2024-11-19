import Header from "../components/Header.jsx";
import Steps from "../components/steps.jsx";
import Description from "../components/Description.jsx";
import Testimonials from "../components/Testimonials.jsx";
import GenerateBtn from "../components/GenerateBtn.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
    </div>
  );
};

export default Home;
