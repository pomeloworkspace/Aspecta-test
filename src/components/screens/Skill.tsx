import { useEffect, useState } from 'react';
import { useAtom } from "jotai";
import { Head } from '~/components/shared/Head';
import { ScoreCard } from '../public/scoreCard'
import { SkillEcharts } from '../public/skillEcharts'
import { SkillDetail } from '../public/skillDetail'
function FillCard() {
  const [curData, setCurData] = useState('')
  const result = JSON.parse(sessionStorage.skillInfo||'{}')
  const candidates = result.candidates[0] || {}
  const value = Math.ceil(candidates.overall_score)
  useEffect(() => {
    if (candidates.skills) {
      // default selete the first skill
      setCurData(candidates.skills[0].name);
    }
  });
  const onChange = (data:Object) => {
    console.log(data)
    // TODO
  }
  return (
    <>
      <Head title="SKILL PAGE" />
      <div className="min-h-screen p-3 flex flex-col items-center">
        <div className="flex flex-row flex-wrap w-full md:w-4/5  lg:w-4/5">
          <div className='w-full lg:w-1/2 '>
            <div className='italic font-bold p-3 bg-yellow-300 w-max pl-4 pr-20 mb-4'>Coding Skills</div>
            <div className='flex flex-row flex-wrap w-full justify-center pb-8'>
              <ScoreCard score={value}/>
              <SkillEcharts　skills={candidates.skills} onChange={onChange}/>
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
