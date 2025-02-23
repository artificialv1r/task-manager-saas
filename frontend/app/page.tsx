import Header from "../components/Header";
import Footer from "../components/Footer";
import TaskList from "../components/TaskList";
import "./globals.css"; // ili gde god se nalazi vaša CSS datoteka

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <TaskList /> {/* TaskList sada preuzima zadatke sa backend-a */}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
