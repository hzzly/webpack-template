import * as React from 'react';
import Home from '@/containers/Home';
import Toast from '@/components/Toast';

const App: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => {
      Toast('你好呀~');
    }, 1000);
  }, []);

  return <Home />;
};

export default App;
