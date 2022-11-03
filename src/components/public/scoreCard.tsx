type Props = {
  score: string | number
}
export const ScoreCard = ({ score }: Props) => {
  return (
    <div className=' flex flex-col w-full md:w-1/2 mb-4 md:mb-0'>
      <span className=''>General Performance</span>
      <span className='font-bold'>Score</span>
      <div className="radial-progress self-center text-center text-blue-900" style={{"--value":score,"--size": "10rem","--thickness": "0.45rem"}}>
        <span className='text-6xl'>{score}</span>
        <span>/100</span>
      </div>
    </div>
  )
}