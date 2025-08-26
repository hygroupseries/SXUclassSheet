import BioHeader from './components/BioHeader';
import ClassSheet from './components/ClassSheet';
import SocialStrip from './components/SocialStrip';
import GlobalFooter from './components/GlobalFooter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BioHeader />
      <ClassSheet />
      <SocialStrip />
      <GlobalFooter />
    </div>
  );
}

export default App;
