// components/Chart.tsx
import React, { useEffect, useRef } from 'react';

interface ChartProps {
  symbol: string;
}

const Chart: React.FC<ChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTradingView = () => {
      if (window.TradingView) {
        // Initialize TradingView widget
        new window.TradingView.widget({
          symbol: symbol,
          container_id: chartContainerRef.current?.id,
          autosize: false,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: true,
          allow_symbol_change: false,
          save_image: false,
          studies: ["BB@tv-basicstudies"],
        });
      } else {
        console.error("TradingView library not loaded");
      }
    };

    // Wait for the TradingView script to load
    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = loadTradingView;
      document.body.appendChild(script);
    } else {
      loadTradingView();
    }
  }, [symbol]);

  return <div ref={chartContainerRef} id="tradingview_chart" style={{ width: "100%", height: "500px" }} />;
};

export default Chart;
