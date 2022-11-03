import { useEffect, useState } from 'react';
type Props = {
  onChange: Function;
  text: Array<string>
};
const chosedata = ['Artificial intelligence',
'Deep learning',
'Machine learring',
'Natural language processing',
'Computer vision',
'Data mining',
'Multimedia',
'Socialrelation',
'Recommender system',
'Mobile device',
'Telecommunications',
'Computer network',
'Electronic engineering',
'Algorithm',
'CSS']
export const SkillInput = ({text,onChange}: Props) => {
  const [value, setValue] = useState<Array<string>>(text||[])
  console.log(text)
  useEffect(() => {
    setValue(text)
  }, [text]);
  const skillCard = chosedata.filter(item => !value.includes(item)).map(info => 
      <div key={info} className='pl-2 pr-2 cursor-pointer bg-gray-200 border border-gray-400 rounded-md text-center flex flex-row items-center mr-2 mb-2 md:hover:bg-blue-300 active:bg-blue-300' onClick={()=>{
        let newData = [...value,info]
        setValue(newData)
        onChange&&onChange(newData)
      }}><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13055" width="16" height="16"><path d="M828.704099 196.575729C744.096116 112.384034 631.648434 66.016073 512 66.016073s-232.1288 46.367961-316.736783 130.559656C110.624271 280.800108 64 392.831501 64 512c0 119.199462 46.624271 231.199892 131.232254 315.424271 84.607983 84.191695 197.088348 130.559656 316.736783 130.559656s232.1288-46.367961 316.704099-130.559656c84.67163-84.255342 131.295901-196.288456 131.263217-315.455235C959.967316 392.800538 913.375729 280.800108 828.704099 196.575729zM736.00086 544.00086 544.00086 544.00086l0 192c0 17.695686-14.336138 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 544.00086 288.00086 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l192 0L480.00086 288.00086c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 192 192 0c17.695686 0 32.00086 14.336138 32.00086 32.00086S753.696546 544.00086 736.00086 544.00086z" p-id="13056" fill="#2c2c2c"></path></svg> {info} </div>
    )
  
  const seleteSkillCard = value.map((info,index) => 
    <div key={info} className='flex flex-row items-center pl-2 pr-2 border border-gray-400 rounded-md text-center mr-2 cursor-pointer mb-1 hover:border-blue-900' onClick={()=>{
      let newData = [...value]
      newData.splice(index, 1)
      setValue(newData)
      onChange&&onChange(newData)
    }}> {info} <svg className='ml-1' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2546" width="16" height="16"><path d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m238.4 641.6l-45.6 45.6L512 557.6 318.4 750.4l-45.6-45.6L467.2 512 273.6 318.4l45.6-45.6L512 467.2l193.6-193.6 45.6 45.6L557.6 512l192.8 193.6z" p-id="2547" fill="#2c2c2c"></path></svg></div>
  )
  
  return (
      <div>
        <div className='flex flex-col md:flex-row min-h-full md:border-2 border-blue-900 rounded' >
          <div className='flex flex-row min-h-full p-1 pl-2 pr-2 md:w-96 md:items-center md:justify-center md:border-2 md:border-blue-900 md:border-b-0 md:border-t-0 md:border-l-0'>
            <span className='font-medium'>Skills</span>
          </div>
          <div className='min-h-full  flex flex-row flex-wrap p-1 pl-2 pr-2 pb-0 border-2 border-blue-900 rounded md:w-full md:border-0'>
            {seleteSkillCard}
            <span className='text-gray-400'>{seleteSkillCard.length===0&&'Selete Skills'}</span>
          </div>
        </div>
         
        <div className='flex flex-col md:flex-row min-h-full mt-4'>
          <div className='md:w-96'>

          </div>
          <div className='flex flex-row flex-wrap w-full'>
            {skillCard}
          </div>
        </div>
        
      </div>
      
  )
};