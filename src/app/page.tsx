"use client"; // спросить 

import { useState } from "react";
import styles from "./page.module.css";
import Image from 'next/image'
import {Button, Icon, Input} from "@/shared/ui";
import { AVATARS } from "@/entities/avatar/model/avatars";

export default function Home() {
  const [avatar , setAvatar ] = useState< null| number >(null)
  const avatars = AVATARS.map((a)=>{
      return(
<li key={a.id} className={styles.avatarItem}>
          <label className={styles.avatarLabel}>
          <input
        className={styles.radio}
          type="radio"
          name="avatar"
          value={a.id}
          checked={avatar === a.id}
          onChange={(e) => setAvatar(+e.target.value)}
        />
        <Image src={a.image} width={80} height={80} alt="Аватар"/>
      </label>
        </li>

      )
        
        

  })
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
    <header className={styles.header}>
        <h1 className={styles.title}>
          CyberScout
        </h1>
        <p className={styles.text}>Твоё приключение в цифровом мире начинается здесь</p>
      </header>
      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.formWrapper}> 
            <label htmlFor="name" className={styles.label}>
              Как тебя зовут
            </label>
            <Input id="name" placeholder="Введи имя..."/>
          </div>
          <fieldset>
            <legend className={styles.label}>Выбери своего аватара</legend>
            <ul className={styles.avatarList}>
             {avatars}
          </ul>
          </fieldset>
                    
          <Button variant="primary" onClick={() =>{ console.log("hello")}} isDisable={false}>
            <span>Начать путешествие</span>
            <Icon icon="RocketIcon"/>
          </Button>


        </form>
      </main>
      </div>
    </div>
  );
}
