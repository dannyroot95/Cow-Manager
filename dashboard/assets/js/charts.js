
details()

function details(){

  let chartConfig = {
    type: 'area',
    theme: 'classic',
    backgroundColor: '#fff',
    title: {
      text: 'Analisis comparativo - 2022',
      backgroundColor: 'none',
      fontFamily: 'Lato',
      fontColor: '#000',
      fontSize: '20px',
      fontWeight: 'normal',
      textAlign: 'left',
    },
    legend: {
      align: 'center',
      backgroundColor: '#145A32',
      borderColor: '#808080',
      fontFamily: 'Lato',
      fontSize: '10px',
      item: {
        fontColor: '#ffffff',
        markerStyle: 'match',
      },
      layout: 'float',
      margin: '5% auto auto auto',
      toggleAction: 'remove',
    },
    plot: {
      tooltip: {
        visible: false,
      },
      tooltipText: '%t: %v',
      activeArea: true,
      animation: {
        delay: 500,
        effect: 'ANIMATION_EXPAND_BOTTOM',
        speed: 600,
      },
      shadow: false,
      stacked: true,
    },
    plotarea: {
      margin: '10% 8% 14% 12%',
    },
    scaleX: {
      values: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      guide: {
        lineColor: '#808080',
        lineStyle: 'solid',
      },
      item: {
        fontColor: '#808080',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: 'normal',
        offsetY: '5%',
      },
      lineColor: '#808080',
      lineStyle: 'solid',
      lineWidth: '1px',
      tick: {
        lineColor: '#808080',
        lineWidth: '1px',
      },
    },
    scaleY: {
      values: '0:150:50',
      format: '%v R',
      guide: {
        alpha: 0.1,
        lineColor: '#808080',
        lineStyle: 'solid',
      },
      item: {
        fontColor: '#808080',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: 'normal',
        offsetX: '-5%',
      },
      lineColor: '#808080',
      lineWidth: '1px',
      tick: {
        lineColor: '#808080',
        lineWidth: '1px',
      },
    },
    crosshairX: {
      lineColor: '#FFFFFF',
      lineWidth: '2px',
      marker: {
        visible: false,
      },
      offsetY: '10%',
      plotLabel: {
        text: '<strong>%t</strong>: %v Registros',
        fontColor: '#000000',
        fontFamily: 'Lato',
      },
      scaleLabel: {
        offsetY: '5%',
      },
    },
  
    series: [
      {
        text: 'Ojos y ojera',
        values: [44, 40, 44, 37, 35, 46,12,4,34,22,34,2],
        backgroundColor: '#8DD62E',
        lineColor: '#8DD62E',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#8DD62E',
          borderColor: '#8DD62E',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'Piel',
        values: [40, 32, 37, 27, 27, 32],
        backgroundColor: '#FF006F',
        lineColor: '#FF006F',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#FF006F',
          borderColor: '#FF006F',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'Postura y movimiento',
        values: [37, 24, 26, 17, 19, 17],
        backgroundColor: '#00D3E6',
        lineColor: '#00D3E6',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#00D3E6',
          borderColor: '#00D3E6',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'Apetito',
        values: [20, 13, 12, 8, 15, 9],
        backgroundColor: '#FFD540',
        lineColor: '#FFD540',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#FFD540',
          borderColor: '#FFD540',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
    ],
  };
  
  zingchart.render({
    id: 'dashChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
  });
}