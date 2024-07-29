import React from 'react';
import HLSPlayer from '../components/HLSPlayer';

function StreamingPage() {


  return (
      <div className="streaming-page">
          <div>
              <HLSPlayer src="http://localhost:8080/hls/test.m3u8" /> {/* HLS 스트림 URL 전달 */}
          </div>
      </div>
  );
}

export default StreamingPage;