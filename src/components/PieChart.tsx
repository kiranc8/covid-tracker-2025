import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import '../styles/Chart.css';

interface PieChartProps {
  active: number;
  recovered: number;
  death: number;
  title?: string;
}

const PieChart: React.FC<PieChartProps> = ({ 
  active, 
  recovered, 
  death, 
  title = "COVID-19 Case Distribution" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const total = active + recovered + death;
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const data = [
    {
      type: "pie",
      labels: ["Active Cases", "Recovered", "Deaths"],
      values: [active, recovered, death],
      marker: {
        colors: ["#FF6B6B", "#4ECDC4", "#556270"],
        line: {
          color: '#FFFFFF',
          width: 2
        }
      },
      textinfo: "label+percent",
      hoverinfo: "label+value+percent",
      hole: 0.5,
      opacity:isVisible?1:0,
      rotation: 45,
      direction: 'clockwise',
      textfont: {
        family: 'Inter, sans-serif',
        size: 14,
        color: '#2d3436'
      },
      insidetextorientation: 'radial',
      hovertemplate: '<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}<extra></extra>',
      hoverlabel: {
        bgcolor: '#2d3436',
        font: {
          color: '#ffffff'
        }
      }
    }
  ];

  const layout = {
    width: "100%",
    height: 480,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { t: 80, b: 80, l: 40, r: 40 },
    showlegend: true,
    legend: {
      orientation: "h",
      y: -0.2,
      xanchor: 'center',
      x: 0.5,
      font: {
        family: 'Inter, sans-serif',
        size: 12,
        color: '#2d3436'
      },
      bgcolor: 'rgba(255,255,255,0.7)',
      bordercolor: '#e0e0e0',
      borderwidth: 1
    },
    annotations: [
      {
        text: `<b>Total<br>${total.toLocaleString()}</b>`,
        showarrow: false,
        font: {
          size: 18,
          family: 'Inter, sans-serif',
          color: '#2d3436'
        },
        x: 0.5,
        y: 0.5,
        align: 'center',
        valign: 'middle'
      }
    ],
    transition: {
      duration: 1000,
      easing: 'elastic-in-out'
    }
  };

  const config = {
    responsive: true,
    displayModeBar: false
  };

  return (
    <div className="chart-container glassmorphism">
      <div className="chart-header">
        <div className="chart-title-row">
          <h2 className="chart-title">{title}</h2>
          <div className="total-badge pulse">
            <span className="total-text">Total: {total.toLocaleString()}</span>
          </div>
        </div>
        <div className="chart-subtitle">Interactive case distribution visualization</div>
      </div>

      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />

      <div className="chart-footer">
        <div className="update-indicator">
          <span className="update-dot"></span>
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default PieChart;