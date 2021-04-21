import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {

  const [input, setInput] = useState("")
  const [bizzies, setBizzies] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!input) return window.alert("Please enter a non-blank location.")
    try {
      const {data} = await axios(`/api/search/?location=${input}`)
      setBizzies(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Parking Lots Suck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Parking Lots Suck!
        </h1>

        <p className={styles.description}>
          A list of bad parking lots in your area.
        </p>
        <form onSubmit={handleSubmit}>
        <input
        placeholder="Enter your location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit"/>
        </form>

        <div className={styles.grid}>
          {!bizzies.length && <h3>No Parking Lots Found!</h3>}
          {bizzies.map(bizzie => {
            const calcScore = () => {
              const numCount = Number(bizzie.review_count)
              const numRating = Number(bizzie.rating)
              const calced = (numCount * numRating)/(numCount + 1)
              return calced.toFixed(2)
            }
            return (
              <div className={styles.card}>
                <h4>{bizzie.name}</h4>
                {bizzie.image_url && 
                <img
                style={{maxWidth: 200, maxHeight: 200}}
                alt={bizzie.name}
                src={bizzie.image_url}
                />
                }
            <p>{bizzie.location.address1 + " " + bizzie.location.city + " " + bizzie.location.state +  " " + bizzie.location.zip_code}</p>
            <p>Star Rating: {bizzie.rating}</p>
            <p>Review Count: {bizzie.review_count}</p>
            <p>AirGarage Score: {calcScore()}</p>
            <a
            href={bizzie.url}
            >Link to Yelp Page</a>
              </div>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
