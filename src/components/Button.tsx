interface ButtonProps {
  value: number | string
  buttomCollor: string
  textCollor: string
  onClick: (value: number | string) => void
}

export default function Button({
  value,
  buttomCollor,
  textCollor,
  onClick,
}: ButtonProps) {
  function handleClick() {
    onClick(value)
  }
  return (
    <div>
      <button
        onClick={handleClick}
        className={`            
        shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)]
        shadow-[inset_0_-2px_8px_rgba(0,0,0,0.1)]
        ${buttomCollor}        
        flex
        h-[64px]
        w-[64px]
        content-center
        items-center
        justify-center
        rounded-full
        text-center
        text-2xl
        font-bold
        ${textCollor}
        shadow-[0_7px_5px_rgba(0,0,0,0.25)]
        shadow-[0_188px_52px_rgba(0,0,0,0.01)]
        shadow-[0_120px_48px_rgba(0,0,0,0.04)]
        shadow-[0_68px_41px_rgba(0,0,0,0.15)]
        shadow-[0_30px_30px_rgba(0,0,0,0.26)]
        shadow-[0_-5px_17px_rgba(0,0,0,0.29)]
        `}
      >
        {value}
      </button>
    </div>
  )
}
