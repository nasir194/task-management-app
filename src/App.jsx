import HeroSection from "./Components/HeroSection/HeroSection";
import TaskBoard from "./Components/TaskBoard/TaskBoard";

export default function App() {
  return (
    <>
      {/* <Header /> */}
      <div className="flex flex-col justify-center items-center">
        <HeroSection />
        <TaskBoard />
      </div>
      {/* <Footer /> */}
    </>
  );
}
