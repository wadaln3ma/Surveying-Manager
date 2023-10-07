

export default function Loader(){

  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 bg-[length:400%_400%] w-full h-full animate-wave-bg">
        <div className="relative w-[150px] h-[150px] prespective-8 rounded-full">

          <div className="absolute top-0 left-0 w-full h-full rounded-full border-b-2 shadow-md shadow-cyan-500 animate-rotate-one"></div> 

          <div className="absolute top-0 right-0 w-full h-full rounded-full border-b-2 shadow-md shadow-cyan-500   animate-rotate-two"></div> 

          <div className="absolute top-0 right-0 w-full h-full rounded-full border-b-2 shadow-md shadow-cyan-500  animate-rotate-three"></div> 

          
        </div>
      </div>
    </div>

)}
