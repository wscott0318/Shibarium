/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    router.push('/home')
  },[])
  return (
    <div className={styles.container}>
      <h1>Shibarium setup...</h1>      
    </div> 
  )
}