import { useEffect, useState } from 'react';
import { atom, useAtom } from "jotai";
import { Head } from '~/components/shared/Head';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks'
import { MyInput } from '../public/myInput'
import { SkillInput } from '../public/skillInput'
const skillInfo = atom({});
function Index() {
  const [skill_names, setSkillName] = useState<Array<string>>([])
  const [candidates, setCandidates] = useState('')
  const [github, setgithub] = useState('')
  const [stackoverflow, setStackoverflow] = useState('')
  const [academic, setAcademic] = useState('')

  const navigate = useNavigate();

  // api: assess_candidates
  const [{ response, loading, error }, executePost] = useAxios(
    {
      url: "/assess_candidates",
      method: "POST",
    },
    { manual: true }
  )
  if(error) {
    console.log(error)
  }
  const [value, setSkillInfo] = useAtom(skillInfo);
  
  const getSkill = () => {
    // check values 
    if(!candidates || !github || !stackoverflow || !academic){
      alert('Please Inter')
      return
    }
    // post api
    executePost({
      data: {
        "skill_names": skill_names, 
        "candidates": [{
                        "identifier": candidates, 
                        "accounts": {
                          "github": github, 
                          "stackoverflow": stackoverflow,
                          "linkedin": "",
                          "academic": academic
                        }
                      }], 
        "appid": "bc17818b-d70e-4883-8148-74a2bea56674"
      }
    })
  }

  const reSet = () => {
    setSkillName([])
    setCandidates('')
    setgithub('')
    setStackoverflow('')
    setAcademic('')
  }
  useEffect(() => {
      if (response) {
        // request return ok && save result
        setSkillInfo(() => response);
        sessionStorage.skillInfo = JSON.stringify(response.data)
        // go to skills card page
        navigate("/skill")
      }
  }, [response]);
  return (
    <>
      <Head title="TOP PAGE" />
      <div className="min-h-screen p-3 flex flex-col items-center">
        <div className="w-full md:w-4/5  lg:w-3/5">
          {/* top */}
          <div className='flex flex-row justify-end flex-wrap mb-6'>
            <button className="btn btn-sm btn-ghost rounded-full btn-active mt-2 w-48 text-gray-400">Candidate Search</button>
            <button className="btn btn-sm btn-warning bg-yellow-300 border-0 rounded-full mt-2 ml-2 w-48 text-gray-900">Candidate Assessment </button>
          </div>
          
          {/* form */}
          <div className='mt-2'>
            <MyInput text={candidates} name="Name" placeholder="Inter Candidate Name" require={true} onChange={(e: string) => {
              setCandidates(e)
            }} />
            <div className="divider"></div> 
            <p className='mb-2 font-bold'>Account URLs:<span className='text-red-500'>*</span></p>

            <MyInput text={academic} name="Microsoft Academic URL" tips="Microsoft Academic URL" placeholder="Inter Microsoft Academic URL" onChange={(e: string) => {
              setAcademic(e)
            }} />
            <MyInput text={github} name="Github Account URL" tips="Github Account URL" placeholder="Inter Github Account URL" onChange={(e: string) => {
              setgithub(e)
            }} />
            <MyInput text={stackoverflow} name="Stack Overflow Account URL" tips="Stack Stack Overflow Account URL" placeholder="Inter Candidate Name" onChange={(e: string) => {
              setStackoverflow(e)
            }} />
            <div className="divider"></div> 

            <SkillInput text={skill_names}  onChange={(e: Array<string>) => {
              setSkillName(e)
            }} />
            <button className='btn bg-blue-200 border-0 flex flex-row text-blue-900 p hover:bg-blue-300'><svg className='mr-1' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4859" width="16" height="16"><path d="M426.666667 426.666667H85.546667A85.418667 85.418667 0 0 0 0 512c0 47.445333 38.314667 85.333333 85.546667 85.333333H426.666667v341.12c0 47.274667 38.186667 85.546667 85.333333 85.546667 47.445333 0 85.333333-38.314667 85.333333-85.546667V597.333333h341.12A85.418667 85.418667 0 0 0 1024 512c0-47.445333-38.314667-85.333333-85.546667-85.333333H597.333333V85.546667A85.418667 85.418667 0 0 0 512 0c-47.445333 0-85.333333 38.314667-85.333333 85.546667V426.666667z" p-id="4860" fill="#0f3881"></path></svg> 
            <span>More</span></button>
            <div className="mt-4 gap-2 flex flex-row justify-end">
              <button className="flex active:opacity-80 flex-row w-max bg-transparent mr-4 border-0 font-medium items-center" onClick={reSet}>
                <svg className='mr-1' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1381" width="18" height="18"><path d="M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z" p-id="1382" fill="#2c2c2c"></path></svg>
                <span className=''>ReSet</span>
              </button>
              <button className={`btn rounded-full w-40 ${loading && 'loading'} bg-blue-800 hover:bg-blue-900 click:bg-blue-700`} onClick={getSkill}>Assess</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
