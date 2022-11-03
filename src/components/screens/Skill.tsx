import { useEffect, useState } from 'react';
import { useAtom } from "jotai";
import { Head } from '~/components/shared/Head';
import { SkillEcharts } from '../public/skillEcharts'
import { SkillDetail } from '../public/skillDetail'
function FillCard() {
  const [curData, setCurData] = useState('')
  const result = JSON.parse(sessionStorage.skillInfo||'{}')
  const candidates = result.candidates[0] || {}
  const value = Math.ceil(candidates.overall_score)
  useEffect(() => {
    if (candidates.skills) {
      setCurData(candidates.skills[0].name);
    }
  });
  return (
    <>
      <Head title="SKILL PAGE" />
      <div className="min-h-screen p-3 flex flex-col items-center">
        <div className="flex flex-row flex-wrap w-full md:w-4/5  lg:w-4/5">
          <div className='w-full lg:w-1/2 '>
            <div className='italic font-bold p-3 bg-yellow-300 w-max pl-4 pr-20 mb-4'>Coding Skills</div>
            <div className='flex flex-row flex-wrap w-full justify-center pb-8'>
              <div className=' flex flex-col w-full md:w-1/2 mb-4 md:mb-0'>
                <span className=''>General Performance</span>
                <span className='font-bold'>Score</span>
                <div className="radial-progress self-center text-center text-blue-900" style={{"--value":value,"--size": "10rem","--thickness": "0.45rem"}}>
                  <span className='text-6xl'>{value}</span>
                  <span>/100</span>
                </div>
              </div>
              <SkillEcharts　skills={candidates.skills}/>
            </div>
          </div>
          <div className='w-full lg:w-1/2'>
          <SkillDetail name={curData}/>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default FillCard;
