import React, { useEffect, useState } from 'react';

import './Progress.css';

const Progress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="my-progress" style={{ width: `${scroll * 100}%` }} />
  );
};

export default Progress;