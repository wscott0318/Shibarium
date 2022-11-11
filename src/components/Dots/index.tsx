interface DotsProps {
  children?: any
  className?: string
}

export default function Dots({ children = <span />, className }: DotsProps) {
  return (
    <>
      <style jsx>
        {`
          .dots::after {
            content: '.';
          }
        `}
      </style>
      <span
        className=''
      >
        {children}
      </span>
    </>
  )
}
