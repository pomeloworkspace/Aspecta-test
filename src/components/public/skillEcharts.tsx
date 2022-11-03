
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
type Skill = {
   name: string,
   average: string | number,
   sources: Array<string>
}

type Props = {
  skills: Array<Skill>,
  onChange: Function
};
export const SkillEcharts = ({skills}:Props) => {
  const getOptions=(list:Array<Skill>)=>{

    // set initial data : sources.length > 0
    let indicator = list.filter(info=>info.sources.length>0).map(item=>{
        return {
          text: item.name,
          max: 100
        }
      }
    )
    let value = list.map(item=>item.average)
    return {
      color: ['#fee261'],
      title: {
        text: ''
      },
      legend: {},
      radar: [
        {
        },
        {
          indicator: indicator,
          center: ['50%', '53%'],
          shape: 'circle',
          radius: 70,
          axisName: {
            formatter: '{value}',
            color: '#000'
          }
        }
      ],
      series: [
        {
          type: 'radar',
          radarIndex: 1,
          data: [
            {
              value: value,
              label: {
                // show: true,
                formatter: function (params: any) {
                  return params.value as string;
                }
              },
              symbolSize:2,
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: '#fee261',
                    offset: 0
                  },
                  {
                    color: '#fee261',
                    offset: 1
                  }
                ])
              }
            }
          ]
        }
      ]
    }
  }

  useEffect(() => {
    if (skills && skills.length) {
      var chartDom = document.getElementById('ech');
      var myChart = echarts.init(chartDom);
      var option = getOptions(skills);
      option && myChart.setOption(option);
      myChart.on('click', function (params) {
        console.log(params)
        //TODO
      });
    }
   
}, [skills]);
  return (
    <div className='w-full md:w-1/2 h-52'>
      <div id="ech" className='w-full h-full flex flex-row justify-center' >
      
      </div>
   </div>
  )
}