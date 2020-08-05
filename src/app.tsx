import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import Home from '@/containers/Home';
import Toast from '@/components/Toast';

const App: FunctionalComponent = () => {
  useEffect(() => {
    setTimeout(() => {
      Toast('你好呀~');
    }, 1000);
  }, []);

  return <Home />;
};

export default App;
