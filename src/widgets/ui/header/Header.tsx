import Image from "next/image"  

export function Header() {
  return (
    <header>
      <div>
        <Image src="/logo.svg" alt="logo" width={115} height={28} />
      </div>
      <div className={s}></div>
    </header>
  )
}
